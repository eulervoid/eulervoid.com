import { useLayoutEffect, useState, useCallback, memo } from "react";
import { motion, useAnimate, steps, MotionValue } from "motion/react";

type ClickEffect = {
	id: number;
	x: number;
	y: number;
};

const FRAME_WIDTH = 32;
const FRAME_COUNT = 6;
const ANIMATION_DURATION = 0.3;
const CURSOR_ZINDEX = 9999;

type SimulatedCursorProps = {
	clickTrigger: number;
	isVisible: boolean;
	springX: MotionValue<number>;
	springY: MotionValue<number>;
};

export function SimulatedCursor({ clickTrigger, isVisible, springX, springY }: SimulatedCursorProps) {
	const [clicks, setClicks] = useState<ClickEffect[]>([]);

	useLayoutEffect(() => {
		if (clickTrigger > 0) {
			setClicks((prev) => [
				...prev,
				{ id: clickTrigger, x: springX.get(), y: springY.get() },
			]);
		}
	}, [clickTrigger, springX, springY]);

	const handleClickComplete = useCallback((id: number) => {
		setClicks((prev) => prev.filter((click) => click.id !== id));
	}, []);

	if (!isVisible) return null;

	return (
		<>
			<motion.div
				className="fixed top-0 left-0 pointer-events-none"
				style={{ x: springX, y: springY, zIndex: CURSOR_ZINDEX }}
			>
				<img
					src="/images/mouse.png"
					alt="cursor"
					className="w-12 h-12 pixel-art"
					style={{ marginLeft: -4, marginTop: -2 }}
				/>
			</motion.div>

			{clicks.map((click) => (
				<ClickEffectMemo
					key={click.id}
					id={click.id}
					x={click.x}
					y={click.y}
					onComplete={handleClickComplete}
				/>
			))}
		</>
	);
}

type ClickEffectProps = {
	id: number;
	x: number;
	y: number;
	onComplete: (id: number) => void;
};

const ClickEffectMemo = memo(function ClickEffect({ id, x, y, onComplete }: ClickEffectProps) {
	const [scope, animate] = useAnimate();

	useLayoutEffect(() => {
		animate(
			scope.current,
			{ backgroundPositionX: `-${(FRAME_COUNT - 1) * FRAME_WIDTH}px` },
			{ duration: ANIMATION_DURATION, ease: steps(FRAME_COUNT - 1, "end") },
		).then(() => onComplete(id));
	}, [animate, id, onComplete, scope]);

	return (
		<div
			ref={scope}
			className="fixed pixel-art pointer-events-none"
			style={{
				left: x,
				top: y,
				zIndex: CURSOR_ZINDEX - 1,
				backgroundImage: "url(/images/click.png)",
				backgroundRepeat: "no-repeat",
				backgroundSize: "192px 32px",
				backgroundPositionX: "0px",
				width: 32,
				height: 32,
				transform: "translate(-50%, -50%)",
			}}
		/>
	);
});
