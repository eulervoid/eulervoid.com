import type { MotionValue } from "motion/react";

export type CursorPosition = {
	x: number;
	y: number;
};

export type CursorTarget =
	| { type: "element"; element: HTMLElement }
	| { type: "position"; position: CursorPosition };

export type CommandCallback = (result: CommandResult) => void;

export type MoveCommandInput = {
	action: "move";
	target: CursorTarget;
	onComplete?: CommandCallback;
};

export type ClickCommandInput = {
	action: "click";
	target: CursorTarget;
	onComplete?: CommandCallback;
};

export type IdleCommandInput = {
	action: "idle";
	duration: number;
	onComplete?: CommandCallback;
};

export type ShowCommandInput = {
	action: "show";
	onComplete?: CommandCallback;
};

export type HideCommandInput = {
	action: "hide";
	onComplete?: CommandCallback;
};

export type CursorCommandInput =
	| MoveCommandInput
	| ClickCommandInput
	| IdleCommandInput
	| ShowCommandInput
	| HideCommandInput;

export type CommandResult = {
	action: CursorCommandInput["action"];
	success: boolean;
	reason?: "completed" | "target-out-of-view" | "cancelled";
};

export type CursorState = {
	position: CursorPosition;
	isVisible: boolean;
	isClicking: boolean;
};

export type CursorController = {
	dispatch: (command: CursorCommandInput) => void;
	clear: () => void;
	setTarget: (el: HTMLElement | null) => void;
};

export type CursorContextValue = {
	controller: CursorController;
	state: CursorState;
	springX: MotionValue<number>;
	springY: MotionValue<number>;
};

export type CursorProviderProps = {
	children: React.ReactNode;
	initialPosition?: CursorPosition;
	springConfig?: {
		stiffness?: number;
		damping?: number;
	};
};
