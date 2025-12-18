import { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";
import type { CursorContextValue, CursorProviderProps, CursorPosition } from "./types";
import { useCursorController } from "./useCursorController";
import { SimulatedCursor } from "./SimulatedCursor";

const CursorContext = createContext<CursorContextValue | null>(null);

const DEFAULT_INITIAL_POSITION: CursorPosition = { x: -100, y: -100 };

export function CursorProvider({
	children,
	initialPosition = DEFAULT_INITIAL_POSITION,
	springConfig,
}: CursorProviderProps) {
	const [clickTrigger, setClickTrigger] = useState(0);
	const [isVisible, setIsVisible] = useState(true);
	const mousePositionRef = useRef<CursorPosition>({ x: -1000, y: -1000 });

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			mousePositionRef.current = { x: e.clientX, y: e.clientY };
		};
		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	const triggerClick = useCallback(() => {
		setClickTrigger((prev) => prev + 1);
	}, []);

	const { controller, state, springX, springY } = useCursorController({
		initialPosition,
		springConfig,
		onClickTrigger: triggerClick,
		onVisibilityChange: setIsVisible,
		userMouseRef: mousePositionRef,
	});

	// Store in ref to avoid re-renders from context consumers
	const contextValue = useRef<CursorContextValue>({ controller, state, springX, springY });
	contextValue.current = { controller, state, springX, springY };

	return (
		<CursorContext.Provider value={contextValue.current}>
			{children}
			<SimulatedCursor
				clickTrigger={clickTrigger}
				isVisible={isVisible}
				springX={springX}
				springY={springY}
			/>
		</CursorContext.Provider>
	);
}

export function useCursor(): CursorContextValue {
	const context = useContext(CursorContext);
	if (!context) {
		throw new Error("useCursor must be used within a CursorProvider");
	}
	return context;
}

export function useCursorDispatch() {
	return useCursor().controller.dispatch;
}
