import { useMemo, useState, useRef } from "react";
import {
	motion,
	useTransform,
	MotionValue,
	useMotionValueEvent,
	useSpring,
	easeOut,
} from "motion/react";
import { closeButtonPosition, Window } from "~/components/Window";
import { createPausableRange } from "~/util";
import { Click, ClickAnimator } from "./ClickAnimator";
import { nanoid } from "nanoid";
import { useLayoutEffect } from "@tanstack/react-router";

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
	position?: {
		top: number;
		left: number;
	};
	closed?: boolean;
	zIndex?: number;
};

type DesktopProps = {
	windows: WindowData[];
	progress: MotionValue<number>;
};

const DEFAULT_WINDOW_HEIGHT = 300;
const DEFAULT_WINDOW_WIDTH = 500;
const ZINDEX_START = 100;

export function Desktop({ windows: initialWindows, progress }: DesktopProps) {
	const [windows, setWindows] = useState<WindowState[]>([]);
	const containerRef = useRef<HTMLDivElement>(null);
	const windowRefs = useRef<HTMLDivElement[]>([]);
	const [clicks, setClicks] = useState<Click[]>([]);

	const smoothProgress = useSpring(progress, {
		stiffness: 500,
		damping: 50,
		restDelta: 0.001,
	});

	useLayoutEffect(() => {
		if (containerRef.current && initialWindows.length > 0) {
			const initialWindowsState = initialWindows.map((window, index) => {
				const size = {
					width: window.size?.width || DEFAULT_WINDOW_WIDTH,
					height: window.size?.height || DEFAULT_WINDOW_HEIGHT,
				};
				return {
					title: window.title,
					imageUrl: window.imageUrl,
					size,
					closed: false,
					zIndex: ZINDEX_START - index,
				};
			});

			setWindows(initialWindowsState);
		}
	}, [initialWindows, containerRef.current]);

	useLayoutEffect(() => {
		if (windowRefs.current && containerRef.current) {
			windowRefs.current.forEach((window, index) => {
				const windowRect = window.getBoundingClientRect();
				const containerRect = containerRef.current?.getBoundingClientRect();
				if (!containerRect) return;
				const windowTop = windowRect.top - containerRect.top;
				const windowLeft = windowRect.left - containerRect.left;
				setWindows((prev) => {
					const newWindows = [...prev];
					newWindows[index].position = {
						top: windowTop,
						left: windowLeft,
					};
					return newWindows;
				});
			});
		}
	}, [windowRefs.current, containerRef.current]);

	// Create arrays of close button positions for all windows
	const closeButtonPositions = useMemo(() => {
		return windows.map((window) => {
			const position = window.position || { top: 0, left: 0 };
			return closeButtonPosition(position);
		});
	}, [windows]);

	const closeAnimationRange = useMemo(() => {
		const range =
			closeButtonPositions.length === 0
				? []
				: [
						{ x: 0, y: 0 },
						...closeButtonPositions,
						closeButtonPositions.at(-1),
					];
		return createPausableRange(range, {
			totalPausePercentage: 0.001,
			pauseWeights: { start: 0.1, intermediate: 1, end: 0.1 },
		});
	}, [closeButtonPositions]);

	const mouseX = useTransform(
		progress,
		closeAnimationRange.inputRange,
		closeAnimationRange.outputRange.map((pos) => pos.x),
		{ ease: easeOut },
	);

	const mouseY = useTransform(
		progress,
		closeAnimationRange.inputRange,
		closeAnimationRange.outputRange.map((pos) => pos.y),
		{ ease: easeOut },
	);

	const handleClickComplete = (id: string) => {
		setClicks((prev) => prev.filter((click) => click.id !== id));
	};

	useMotionValueEvent(smoothProgress, "change", (currentProgress) => {
		setWindows((prev) =>
			prev.map((window, index) => {
				const numMidpoins = closeAnimationRange.pauseMidpoints.length;
				const numWindows = windows.length;
				if (numMidpoins !== numWindows) return window;
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

	function windowClasses(index: number): string {
		const margin = index === 0 ? "" : "-mt-64";
		const alignment = index % 2 === 0 ? "self-end" : "self-start";
		return `${margin} ${alignment}`;
	}

	return (
		<div
			ref={containerRef}
			className="section relative w-full h-full flex flex-col"
		>
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

			{windows.map((window, index) => {
				return (
					<Window
						ref={(el) => {
							if (el) windowRefs.current[index] = el;
						}}
						key={window.title}
						zIndex={window.zIndex || 1}
						title={window.title}
						size={window.size}
						imageUrl={window.imageUrl}
						closed={window.closed || false}
						onClick={() => {}}
						className={windowClasses(index)}
					/>
				);
			})}

			{clicks.map((click) => (
				<ClickAnimator
					key={click.id}
					id={click.id}
					position={click.position}
					zIndex={ZINDEX_START + 1}
					onComplete={handleClickComplete}
				/>
			))}
		</div>
	);
}
