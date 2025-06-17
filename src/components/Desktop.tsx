import { useMemo, useState, useRef, useEffect } from "react";
import {
	motion,
	useTransform,
	MotionValue,
	useMotionValueEvent,
	easeInOut,
	useSpring,
	easeOut,
} from "motion/react";
import { closeButtonPosition, Window, WindowState } from "~/components/Window";
import { createPausableRange, Point, randomPoint } from "~/util";
import { Click, ClickAnimator } from "./ClickAnimator";
import { nanoid } from "nanoid";

type WindowData = {
	title: string;
	imageUrl: string;
	size?: {
		width?: number;
		height?: number;
	};
};

type DesktopProps = {
	windows: WindowData[];
	progress: MotionValue<number>;
};

const distance = (p1: Point, p2: Point): number => {
	const dx = p1.x - p2.x;
	const dy = p1.y - p2.y;
	return Math.sqrt(dx * dx + dy * dy);
};

const findMaxDistancePoint = (
	rectX: number,
	rectY: number,
	existingPoints: Point[],
	numSamples: number,
	rng: () => number = Math.random,
): Point => {
	let bestPoint = randomPoint(0, 0, rectX, rectY, rng);
	let maxSummedDistanceFound = 0;

	if (!existingPoints || existingPoints.length === 0) {
		return bestPoint;
	}

	for (let i = 0; i < numSamples; i++) {
		const currentPoint = randomPoint(0, 0, rectX, rectY, rng);
		const summedDistance = existingPoints.reduce(
			(dist, point) => dist + distance(currentPoint, point),
			0,
		);
		if (summedDistance > maxSummedDistanceFound) {
			maxSummedDistanceFound = summedDistance;
			bestPoint = currentPoint;
		}
	}

	return bestPoint;
};

function samplePositions(
	rects: { x: number; y: number }[],
	numSamples: number,
	rng: () => number = Math.random,
): Point[] {
	let points: Point[] = [];
	for (const rect of rects) {
		points = [
			...points,
			findMaxDistancePoint(rect.x, rect.y, points, numSamples, rng),
		];
	}
	return points;
}

function getRects(
	containerWidth: number,
	containerHeight: number,
	windows: WindowData[],
): Point[] {
	return windows.map((window) => {
		const size = {
			width: window.size?.width || DEFAULT_WINDOW_WIDTH,
			height: window.size?.height || DEFAULT_WINDOW_HEIGHT,
		};
		const maxLeft = Math.max(0, containerWidth - size.width);
		const maxTop = Math.max(0, containerHeight - size.height);
		return { x: maxLeft, y: maxTop };
	});
}

// @ts-ignore
function relaxPoints(points: BoundedPoint[]): BoundedPoint[] {
	// TODO: implement..
	return points;
}

const DEFAULT_WINDOW_HEIGHT = 300;
const DEFAULT_WINDOW_WIDTH = 500;
const ZINDEX_START = 100;

export function Desktop({ windows: initialWindows, progress }: DesktopProps) {
	const [windows, setWindows] = useState<WindowState[]>([]);
	const containerRef = useRef<HTMLDivElement>(null);
	const [clicks, setClicks] = useState<Click[]>([]);

	const smoothProgress = useSpring(progress, {
		stiffness: 100,
		damping: 30,
		restDelta: 0.001,
	});

	useEffect(() => {
		if (containerRef.current && initialWindows.length > 0) {
			const containerWidth = containerRef.current.offsetWidth;
			const containerHeight = containerRef.current.offsetHeight;
			const rects = getRects(containerWidth, containerHeight, initialWindows);
			const positions = samplePositions(rects, 10);

			const initialWindowsState = initialWindows.map((window, index) => {
				const size = {
					width: window.size?.width || DEFAULT_WINDOW_WIDTH,
					height: window.size?.height || DEFAULT_WINDOW_HEIGHT,
				};
				return {
					title: window.title,
					imageUrl: window.imageUrl,
					position: {
						top: positions[index].y,
						left: positions[index].x,
					},
					size,
					closed: false,
					zIndex: ZINDEX_START - index,
				};
			});

			setWindows(initialWindowsState);
		}
	}, [initialWindows, containerRef.current]);

	// Create arrays of close button positions for all windows
	const closeButtonPositions = useMemo(() => {
		if (windows.length === 0)
			return [
				{ x: 0, y: 0 },
				{
					x: containerRef.current?.offsetWidth || 0,
					y: containerRef.current?.offsetHeight || 0,
				},
			];
		return windows.map((window) => closeButtonPosition(window));
	}, [windows]);

	const closeAnimationRange = useMemo(() => {
		return createPausableRange(
			[{ x: 0, y: 0 }, ...closeButtonPositions, { x: 0, y: 0 }],
			{
				totalPausePercentage: 0.1,
				pauseWeights: { start: 0.1, intermediate: 1, end: 0.1 },
			},
		);
	}, [closeButtonPositions]);

	const mouseX = useTransform(
		smoothProgress,
		closeAnimationRange.inputRange,
		closeAnimationRange.outputRange.map((pos) => pos.x),
		{ ease: easeOut },
	);

	const mouseY = useTransform(
		smoothProgress,
		closeAnimationRange.inputRange,
		closeAnimationRange.outputRange.map((pos) => pos.y),
		{ ease: easeOut },
	);

	const handleClickComplete = (id: string) => {
		setClicks((prev) => prev.filter((click) => click.id !== id));
	};

	// Update window states based on closeAnimationRange progress
	useMotionValueEvent(smoothProgress, "change", (currentProgress) => {
		setWindows((prev) =>
			prev.map((window, index) => {
				const numMidpoins = closeAnimationRange.pauseMidpoints.length;
				const numWindows = windows.length;
				if (numMidpoins !== numWindows)
					throw new Error(
						`The number of midpoints (${numMidpoins}) did not macht the number of windows ($numWindows}).`,
					);
				const closePoint = closeAnimationRange.pauseMidpoints[index];
				const shouldClose = currentProgress >= closePoint;
				if (window.closed !== shouldClose) {
					setClicks((prev) => [
						...prev,
						{
							id: nanoid(8),
							position: {
								x: mouseX.get() - 4,
								y: mouseY.get() - 10,
							},
						},
					]);
				}
				return {
					...window,
					closed: shouldClose,
				};
			}),
		);
	});

	return (
		<div
			ref={containerRef}
			className="relative w-full h-[800px] overflow-hidden"
		>
			{/* Animated mouse pointer */}
			<motion.div
				className="absolute z-50 pointer-events-none"
				style={{
					x: mouseX,
					y: mouseY,
					zIndex: ZINDEX_START + 2,
				}}
			>
				<img
					src="/images/mouse.png"
					alt="mouse pointer"
					className="w-12 h-12 pixel-art"
				/>
			</motion.div>

			{clicks.map((click) => (
				<ClickAnimator
					key={click.id}
					id={click.id}
					position={click.position}
					zIndex={ZINDEX_START + 1}
					onComplete={handleClickComplete}
				/>
			))}

			{windows.map((window) => {
				return (
					<Window
						key={window.title}
						zIndex={window.zIndex}
						title={window.title}
						imageUrl={window.imageUrl}
						position={window.position}
						size={window.size}
						closed={window.closed}
						onClick={() => {}}
					/>
				);
			})}
		</div>
	);
}
