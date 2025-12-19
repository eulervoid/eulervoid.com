import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { Window, WindowHandle } from "~/components/Window";

type WindowData = {
	title: string;
	imageUrl: string;
	size?: {
		width?: number;
		height?: number;
	};
};

type WindowState = WindowData & {
	size: {
		width: number;
		height: number;
	};
	closed: boolean;
	zIndex: number;
	xOffset: any;
	yOffset: any;
	rotateY: any;
	scale: any;
	transition?: any;
};

type DesktopProps = {
	windows: WindowData[];
};

const DEFAULT_WINDOW_HEIGHT = 300;
const DEFAULT_WINDOW_WIDTH = 500;

export function Desktop({ windows: initialWindows }: DesktopProps) {
	const [windows, setWindows] = useState<WindowState[]>([]);
	const windowRefs = useRef<(WindowHandle | null)[]>([]);
	const isSwapping = useRef(false);
	const lastScrollY = useRef(0);

	useLayoutEffect(() => {
		if (typeof window !== "undefined") {
			lastScrollY.current = window.scrollY;
		}
		if (initialWindows.length > 0) {
			setWindows(
				initialWindows.map((w, i) => ({
					...w,
					size: {
						width: w.size?.width || DEFAULT_WINDOW_WIDTH,
						height: w.size?.height || DEFAULT_WINDOW_HEIGHT,
					},
					closed: false,
					zIndex: 100 - i,
					xOffset: 0,
					yOffset: 0,
					rotateY: 0,
					scale: 1,
				})),
			);
		}
	}, [initialWindows]);

	useEffect(() => {
		const handleScroll = () => {
			if (isSwapping.current) return;

			const currentScrollY = window.scrollY;
			const scrollDirection =
				currentScrollY > lastScrollY.current ? "down" : "up";
			lastScrollY.current = currentScrollY;

			const windowElements = windowRefs.current
				.map((ref) => ref?.getWindow())
				.filter(Boolean) as HTMLDivElement[];

			if (windowElements.length < 2) return;

			const viewportCenter = window.innerHeight / 2;

			// Find pair closest to viewport center
			let closestPairIdx = -1;
			let minPairDist = Infinity;

			for (let i = 0; i < windowElements.length - 1; i++) {
				const rectA = windowElements[i].getBoundingClientRect();
				const rectB = windowElements[i + 1].getBoundingClientRect();
				const pairCenterY =
					(rectA.top +
						rectA.height / 2 +
						(rectB.top + rectB.height / 2)) /
					2;
				const dist = Math.abs(pairCenterY - viewportCenter);

				if (dist < minPairDist) {
					minPairDist = dist;
					closestPairIdx = i;
				}
			}

			if (closestPairIdx === -1 || minPairDist > 300) return;

			const i = closestPairIdx;
			const j = i + 1;
			const rectA = windowElements[i].getBoundingClientRect();
			const rectB = windowElements[j].getBoundingClientRect();

			// Check intersection
			const overlaps =
				rectA.left < rectB.right &&
				rectA.right > rectB.left &&
				rectA.top < rectB.bottom &&
				rectA.bottom > rectB.top;

			if (!overlaps) return;

			const winA = windows[i];
			const winB = windows[j];

			const distACenter = Math.abs(
				rectA.top + rectA.height / 2 - viewportCenter,
			);
			const distBCenter = Math.abs(
				rectB.top + rectB.height / 2 - viewportCenter,
			);

			let shouldSwap = false;
			if (scrollDirection === "down") {
				// Scrolling down: Bring the lower window (winB) to front if it's closer to center
				if (distBCenter < distACenter && winB.zIndex < winA.zIndex) {
					shouldSwap = true;
				}
			} else {
				// Scrolling up: Bring the upper window (winA) to front if it's closer to center
				if (distACenter < distBCenter && winA.zIndex < winB.zIndex) {
					shouldSwap = true;
				}
			}

			if (shouldSwap) {
				isSwapping.current = true;
				performSwap(i, j, rectA, rectB);
			}
		};

		const performSwap = async (
			idxA: number,
			idxB: number,
			rectA: DOMRect,
			rectB: DOMRect,
		) => {
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
			const overlapY =
				Math.min(rectA.bottom, rectB.bottom) -
				Math.max(rectA.top, rectB.top);

			const isARight = idxA % 2 === 0;
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

			const duration = 0.4;
			const transition = {
				duration,
				ease: [0.37, 0, 0.63, 1],
				times: [0, 0.5, 1],
			};

			// Window coming to front scales up, window going to back scales down
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
		const margin = index === 0 ? "" : "-mt-64";
		const alignment = index % 2 === 0 ? "self-end" : "self-start";
		return `${margin} ${alignment}`;
	}

	return (
		<div
			className="relative w-full h-full flex flex-col"
			style={{ perspective: 1000 }}
		>
			{windows.map((window, index) => (
				<Window
					ref={(el) => {
						windowRefs.current[index] = el;
					}}
					key={window.title}
					zIndex={window.zIndex}
					title={window.title}
					size={window.size}
					imageUrl={window.imageUrl}
					closed={window.closed}
					className={windowClasses(index)}
					animate={{
						x: window.xOffset,
						y: window.yOffset,
						rotateY: window.rotateY,
						scale: window.scale,
					}}
					transition={
						window.transition || {
							type: "spring",
							stiffness: 120,
							damping: 20,
						}
					}
				/>
			))}
		</div>
	);
}
