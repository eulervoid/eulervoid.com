import { useCallback, useRef, useEffect, useState } from "react";
import { useSpring } from "motion/react";
import { useAsyncQueuer } from "@tanstack/react-pacer";
import type {
	CursorCommandInput,
	CursorState,
	CursorController,
	CursorPosition,
	CommandResult,
} from "./types";
import { resolveTargetPosition, hasArrived } from "./utils";

const DEFAULT_SPRING_CONFIG = { stiffness: 100, damping: 30 };
const ARRIVAL_THRESHOLD = 2;
const CLICK_ANIMATION_DURATION = 300;

type UseCursorControllerOptions = {
	initialPosition: CursorPosition;
	springConfig?: { stiffness?: number; damping?: number };
	onClickTrigger?: () => void;
	onVisibilityChange?: (visible: boolean) => void;
	userMouseRef?: React.RefObject<CursorPosition>;
};

export function useCursorController(options: UseCursorControllerOptions) {
	const {
		initialPosition,
		springConfig = DEFAULT_SPRING_CONFIG,
		onClickTrigger,
		onVisibilityChange,
	} = options;

	const springX = useSpring(initialPosition.x, springConfig);
	const springY = useSpring(initialPosition.y, springConfig);

	const stateRef = useRef<CursorState>({
		position: initialPosition,
		isVisible: true,
		isClicking: false,
	});

	const [activeTarget, setActiveTarget] = useState<HTMLElement | null>(null);
	const currentCommandRef = useRef<CursorCommandInput | null>(null);

	useEffect(() => {
		let rafId: number;

		const update = () => {
			const command = currentCommandRef.current;
			let targetPos: CursorPosition | null = null;

			// Priority: Explicit active target (via setTarget) OR current command target
			if (activeTarget) {
				targetPos = resolveTargetPosition({ type: "element", element: activeTarget });
			} else if (command && (command.action === "move" || command.action === "click")) {
				targetPos = resolveTargetPosition(command.target);
			}

			if (targetPos) {
				springX.set(targetPos.x);
				springY.set(targetPos.y);
			}

			rafId = requestAnimationFrame(update);
		};

		rafId = requestAnimationFrame(update);
		return () => cancelAnimationFrame(rafId);
	}, [activeTarget, springX, springY]);

	const processCommand = useCallback(
		async (command: CursorCommandInput): Promise<CommandResult> => {
			currentCommandRef.current = command;
			const makeResult = (
				success: boolean,
				reason: CommandResult["reason"] = "completed",
			): CommandResult => {
				currentCommandRef.current = null;
				return { action: command.action, success, reason };
			};

			switch (command.action) {
				case "show":
					onVisibilityChange?.(true);
					return makeResult(true);
				case "hide":
					onVisibilityChange?.(false);
					return makeResult(true);
				case "idle":
					await new Promise((resolve) => setTimeout(resolve, command.duration));
					return makeResult(true);
				case "move":
				case "click": {
					return new Promise<CommandResult>((resolve) => {
						const check = () => {
							const current = { x: springX.get(), y: springY.get() };
							const targetPos = activeTarget 
								? resolveTargetPosition({ type: "element", element: activeTarget })
								: resolveTargetPosition(command.target);

							if (!targetPos) {
								resolve(makeResult(false, "target-out-of-view"));
								return;
							}

							if (hasArrived(current, targetPos, ARRIVAL_THRESHOLD)) {
								if (command.action === "click") {
									stateRef.current.isClicking = true;
									onClickTrigger?.();
									setTimeout(() => {
										stateRef.current.isClicking = false;
										resolve(makeResult(true));
									}, CLICK_ANIMATION_DURATION);
								} else {
									resolve(makeResult(true));
								}
							} else {
								requestAnimationFrame(check);
							}
						};
						requestAnimationFrame(check);
					});
				}
			}
		},
		[springX, springY, onClickTrigger, onVisibilityChange, activeTarget],
	);

	const queuer = useAsyncQueuer(
		async (command: CursorCommandInput) => {
			const result = await processCommand(command);
			command.onComplete?.(result);
			return result;
		},
		{ concurrency: 1, started: true },
	);

	const controller: CursorController = {
		dispatch: (command) => queuer.addItem(command),
		clear: () => queuer.clear(),
		setTarget: (el) => setActiveTarget(el),
	};

	return { controller, state: stateRef.current, springX, springY };
}
