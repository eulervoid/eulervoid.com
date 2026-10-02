import { useEffect } from "react";
import { useAnimate, steps } from "motion/react";

export type Click = {
    id: string;
    position: { x: number; y: number };
};

type ClickAnimatorProps = Click & {
    zIndex: number;
    onComplete: (id: string) => void;
};

const FRAME_WIDTH = 32;
const FRAME_COUNT = 6;
const ANIMATION_DURATION = 0.3; // seconds

export function ClickAnimator({ id, position, zIndex, onComplete }: ClickAnimatorProps) {
    const [scope, animate] = useAnimate();

    useEffect(() => {
        const runAnimation = async () => {
            await animate(
                scope.current,
                { x: position.x, y: position.y, opacity: 1 },
                { duration: 0 },
            );

            await animate(
                scope.current,
                { backgroundPositionX: `-${(FRAME_COUNT - 1) * FRAME_WIDTH}px` },
                { duration: ANIMATION_DURATION, ease: steps(FRAME_COUNT - 1, "end") },
            );

            onComplete(id);
        };
        runAnimation();
    }, []);

    return (
        <div
            ref={scope}
            className="absolute pixel-art"
            style={{
                zIndex,
                backgroundImage: "url(/images/click.png)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "192px 32px",
                width: 32,
                height: 32,
                transform: "translate(-50%, -50%)",
            }}
        />
    );
}
