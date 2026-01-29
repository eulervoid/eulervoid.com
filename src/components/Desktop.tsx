import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { Window, WindowHandle } from "@src/components/Window";
import { WorkDetails } from "@src/components/WorkDetails";
import { Tab, Tabs } from "./Tabs";
import { type WorkEntry } from "@src/data/work";

type AnimatedValue = number | [number, number, number];

type WindowState = {
    size: {
        width: number;
        height: number;
    };
    closed: boolean;
    zIndex: number;
    xOffset: AnimatedValue;
    yOffset: AnimatedValue;
    rotateY: AnimatedValue;
    scale: AnimatedValue;
    transition?: any;
};

type DesktopProps = {
    entries: WorkEntry[];
};

const DEFAULT_WINDOW_HEIGHT = 480;
const DEFAULT_WINDOW_WIDTH = 640;

export function Desktop({ entries }: DesktopProps) {
    const [windows, setWindows] = useState<WindowState[]>([]);
    const windowRefs = useRef<(WindowHandle | null)[]>([]);
    const isSwapping = useRef(false);

    useLayoutEffect(() => {
        if (entries?.length > 0) {
            setWindows(
                entries.map((_, index) => ({
                    size: {
                        width: DEFAULT_WINDOW_WIDTH,
                        height: DEFAULT_WINDOW_HEIGHT,
                    },
                    closed: false,
                    zIndex: 100 - index,
                    xOffset: 0,
                    yOffset: 0,
                    rotateY: 0,
                    scale: 1,
                })),
            );
        }
    }, [entries]);

    // Store the queue of swaps to perform
    const swapQueue = useRef<{ closestIdx: number; targetIdx: number }[]>([]);

    useEffect(() => {
        const handleScroll = () => {
            if (isSwapping.current) return;
            if (swapQueue.current.length > 0) return; // Already have a queue planned

            const windowElements = windowRefs.current
                .map((ref) => ref?.getWindow())
                .filter(Boolean) as HTMLDivElement[];

            if (windowElements.length < 2) return;

            const viewportCenter = window.innerHeight / 2;
            const allRects = windowElements.map((el) => el.getBoundingClientRect());

            // Find window closest to viewport center
            let closestIdx = -1;
            let minDist = Infinity;

            for (let i = 0; i < allRects.length; i++) {
                const rect = allRects[i];
                const centerY = rect.top + rect.height / 2;
                const dist = Math.abs(centerY - viewportCenter);
                if (dist < minDist) {
                    minDist = dist;
                    closestIdx = i;
                }
            }

            if (closestIdx === -1 || minDist > 300) return;

            const closestRect = allRects[closestIdx];
            const closestZ = windows[closestIdx].zIndex;

            // Find all windows that overlap with the closest one and have higher z-index
            const occluding: { idx: number; z: number }[] = [];

            for (let i = 0; i < allRects.length; i++) {
                if (i === closestIdx) continue;

                const rect = allRects[i];
                const overlaps =
                    closestRect.left < rect.right &&
                    closestRect.right > rect.left &&
                    closestRect.top < rect.bottom &&
                    closestRect.bottom > rect.top;

                if (overlaps && windows[i].zIndex > closestZ) {
                    occluding.push({ idx: i, z: windows[i].zIndex });
                }
            }

            if (occluding.length === 0) return;
            occluding.sort((a, b) => a.z - b.z);

            // Build the swap queue
            swapQueue.current = occluding.map((item) => ({
                closestIdx,
                targetIdx: item.idx,
            }));

            // Start processing the queue
            processSwapQueue();
        };

        const processSwapQueue = async () => {
            if (swapQueue.current.length === 0) return;

            const windowElements = windowRefs.current
                .map((ref) => ref?.getWindow())
                .filter(Boolean) as HTMLDivElement[];

            const { closestIdx, targetIdx } = swapQueue.current.shift()!;

            const rectA = windowElements[closestIdx]?.getBoundingClientRect();
            const rectB = windowElements[targetIdx]?.getBoundingClientRect();

            if (!rectA || !rectB) {
                swapQueue.current = [];
                return;
            }

            isSwapping.current = true;
            await performSwap(closestIdx, targetIdx, rectA, rectB);

            // Process next swap in queue
            if (swapQueue.current.length > 0) {
                processSwapQueue();
            }
        };

        const performSwap = async (idxA: number, idxB: number, rectA: DOMRect, rectB: DOMRect) => {
            // Check if A and B overlap each other at given offsets
            const swappingPairOverlaps = (
                aOffsetX: number,
                aOffsetY: number,
                bOffsetX: number,
                bOffsetY: number,
            ) => {
                const movedA = {
                    left: rectA.left + aOffsetX,
                    right: rectA.right + aOffsetX,
                    top: rectA.top + aOffsetY,
                    bottom: rectA.bottom + aOffsetY,
                };
                const movedB = {
                    left: rectB.left + bOffsetX,
                    right: rectB.right + bOffsetX,
                    top: rectB.top + bOffsetY,
                    bottom: rectB.bottom + bOffsetY,
                };
                return (
                    movedA.left < movedB.right &&
                    movedA.right > movedB.left &&
                    movedA.top < movedB.bottom &&
                    movedA.bottom > movedB.top
                );
            };

            // Calculate overlap between A and B
            const overlapY = Math.min(rectA.bottom, rectB.bottom) - Math.max(rectA.top, rectB.top);

            const isARight = rectA.left > rectB.left;
            const isAAbove = rectA.top < rectB.top;

            // Horizontal offset for natural feel
            const hOffset = 20;
            const aX = isARight ? hOffset : -hOffset;
            const bX = isARight ? -hOffset : hOffset;

            // Find minimum vertical separation
            let aY = 0;
            let bY = 0;
            for (let extra = 5; extra <= 200; extra += 5) {
                const sepY = Math.max(0, overlapY) / 2 + extra;
                aY = isAAbove ? -sepY : sepY;
                bY = isAAbove ? sepY : -sepY;
                if (!swappingPairOverlaps(aX, aY, bX, bY)) {
                    break;
                }
            }

            // Calculate new z-indices
            // Goal: swap only A and B's relative order to each other,
            // while keeping their relative order to all other windows unchanged.
            //
            // To do this: if A was above B, make B's new z-index = A's old z-index,
            // and A's new z-index = A's old z-index - 1. Then shift all windows
            // that were between them (or equal to A's new z) down by 1.
            const zIndices = windows.map((w) => w.zIndex);
            const zA = zIndices[idxA];
            const zB = zIndices[idxB];

            const newZIndices = [...zIndices];

            if (zA > zB) {
                // A is currently on top, B will go on top
                // B takes A's z-index, A and everything between shifts down
                newZIndices[idxB] = zA;
                newZIndices[idxA] = zA - 1;
                for (let k = 0; k < zIndices.length; k++) {
                    if (k === idxA || k === idxB) continue;
                    // Shift down anything that was between A and B (exclusive of A, inclusive of nothing above A)
                    if (zIndices[k] < zA && zIndices[k] >= zB) {
                        newZIndices[k] = zIndices[k] - 1;
                    }
                }
            } else {
                // B is currently on top, A will go on top
                newZIndices[idxA] = zB;
                newZIndices[idxB] = zB - 1;
                for (let k = 0; k < zIndices.length; k++) {
                    if (k === idxA || k === idxB) continue;
                    if (zIndices[k] < zB && zIndices[k] >= zA) {
                        newZIndices[k] = zIndices[k] - 1;
                    }
                }
            }

            const duration = 0.5;
            const transition = {
                duration,
                ease: [0.5, 0, 0.5, 1],
                times: [0, 0.5, 1],
            };

            const goingToBack = zA > zB ? idxA : idxB;

            setWindows((prev) => {
                const next = [...prev];
                next[idxA] = {
                    ...next[idxA],
                    xOffset: [0, aX, 0],
                    yOffset: [0, aY, 0],
                    rotateY: 0,
                    scale: goingToBack === idxA ? [1, 1.01, 1] : [1, 0.99, 1],
                    transition,
                };
                next[idxB] = {
                    ...next[idxB],
                    xOffset: [0, bX, 0],
                    yOffset: [0, bY, 0],
                    rotateY: 0,
                    scale: goingToBack === idxB ? [1, 1.01, 1] : [1, 0.99, 1],
                    transition,
                };
                return next;
            });

            // Swap z-index at halfway point
            await new Promise((r) => setTimeout(r, duration * 500));

            setWindows((prev) => {
                const next = [...prev];
                for (let i = 0; i < next.length; i++) {
                    next[i] = { ...next[i], zIndex: newZIndices[i] };
                }
                return next;
            });

            // Wait for animation to complete
            await new Promise((r) => setTimeout(r, duration * 500 + 50));

            // Cleanup
            setWindows((prev) => {
                const next = [...prev];
                next[idxA] = {
                    ...next[idxA],
                    xOffset: 0,
                    yOffset: 0,
                    rotateY: 0,
                    scale: 1,
                    transition: undefined,
                };
                next[idxB] = {
                    ...next[idxB],
                    xOffset: 0,
                    yOffset: 0,
                    rotateY: 0,
                    scale: 1,
                    transition: undefined,
                };
                return next;
            });

            isSwapping.current = false;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [windows]);

    function windowClasses(index: number): string {
        const margin = index === 0 ? "" : "mt-32 lg:-mt-38";
        const alignment = index % 2 === 0 ? "self-start" : "self-end";
        return `${margin} ${alignment}`;
    }

    return (
        <div className="relative w-full h-full flex flex-col pb-6">
            {windows.map((window, windowIndex) => (
                <Window
                    ref={(el) => {
                        windowRefs.current[windowIndex] = el;
                    }}
                    key={entries[windowIndex].title}
                    zIndex={window.zIndex}
                    title={entries[windowIndex].title}
                    closed={window.closed}
                    className={windowClasses(windowIndex)}
                    animate={{
                        x: window.xOffset,
                        y: window.yOffset,
                        rotateY: window.rotateY,
                        scale: window.scale,
                    }}
                    transition={window.transition}
                >
                    <Tabs tabBar="bottom">
                        {entries[windowIndex].media.map((media, mediaIndex) => (
                            <Tab
                                key={media.label || `image-${mediaIndex}`}
                                label={media.label || `image-${mediaIndex}.png`}
                            >
                                {media.srcSet ? (
                                    <img
                                        srcSet={media.srcSet}
                                        alt={media.description || ""}
                                        className="w-full h-full object-cover object-center"
                                        sizes="(max-width: 768px) 100vw, 700px"
                                        loading="lazy"
                                    />
                                ) : (
                                    <img
                                        src={media.url}
                                        alt={media.description || ""}
                                        className="w-full h-full object-cover object-center"
                                        loading="lazy"
                                    />
                                )}
                            </Tab>
                        ))}
                    </Tabs>
                    <WorkDetails entry={entries[windowIndex]} />
                </Window>
            ))}
        </div>
    );
}
