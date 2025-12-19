import { useState, useRef, useCallback, useLayoutEffect } from "react";
import { Window, WindowHandle } from "~/components/Window";
import { useCursor, CommandResult } from "~/components/SimulatedCursor";

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
};

type DesktopProps = {
	windows: WindowData[];
};

const DEFAULT_WINDOW_HEIGHT = 300;
const DEFAULT_WINDOW_WIDTH = 500;
const CLICK_THRESHOLD = 150;

export function Desktop({ windows: initialWindows }: DesktopProps) {
	const [windows, setWindows] = useState<WindowState[]>([]);
	const windowRefs = useRef<(WindowHandle | null)[]>([]);
	const { controller } = useCursor();
	const pendingClick = useRef(false);

	useLayoutEffect(() => {
		if (initialWindows.length > 0) {
			setWindows(
				initialWindows.map((w) => ({
					...w,
					size: {
						width: w.size?.width || DEFAULT_WINDOW_WIDTH,
						height: w.size?.height || DEFAULT_WINDOW_HEIGHT,
					},
					closed: false,
					zIndex: 100,
				})),
			);
		}
	}, [initialWindows]);

	const closeWindow = useCallback((index: number) => {
		setWindows((prev) =>
			prev.map((w, i) => (i === index ? { ...w, closed: true } : w)),
		);
		pendingClick.current = false;
	}, []);

	useLayoutEffect(() => {
		let rafId: number;

		const check = () => {
			for (let i = 0; i < windowRefs.current.length; i++) {
				const w = windowRefs.current[i];
				const state = windows[i];
				if (!w || state?.closed) continue;

				const rect = w.getCloseButton()?.getBoundingClientRect();
				if (!rect) continue;

				if (rect.top < CLICK_THRESHOLD && !pendingClick.current) {
					pendingClick.current = true;
					const el = w.getCloseButton()!;
					controller.dispatch({
						action: "click",
						target: { type: "element", element: el },
						onComplete: (result: CommandResult) => {
							if (result.success) closeWindow(i);
							else pendingClick.current = false;
						},
					});
					break;
				}
			}
			rafId = requestAnimationFrame(check);
		};

		rafId = requestAnimationFrame(check);
		return () => cancelAnimationFrame(rafId);
	}, [controller, closeWindow, windows]);

	function windowClasses(index: number): string {
		const margin = index === 0 ? "" : "-mt-64";
		const alignment = index % 2 === 0 ? "self-end" : "self-start";
		return `${margin} ${alignment}`;
	}

	return (
		<div className="relative w-full h-full flex flex-col">
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
				/>
			))}
		</div>
	);
}
