import { useEffect, useState } from "react";
import { useAnimate, motion } from "framer-motion";

type TypeText = {
	type: "TypeText";
	text: string;
	tick?: number;
};

type DeleteText = {
	type: "DeleteText";
	chars: number;
	tick?: number;
};

type Pause = {
	type: "Pause";
	seconds: number;
};

export type Script = (TypeText | DeleteText | Pause)[];

export type TypewriterProps = {
	script: Script;
	className?: string;
	repeat?: boolean;
	initialText?: string;
};

const DEFAULT_TYPE_SPEED = 0.05;
const DEFAULT_DELETE_SPEED = 0.03;

export function Typewriter({
	script,
	className,
	repeat = false,
	initialText = "",
}: TypewriterProps) {
	const [text, setText] = useState(initialText);
	const [, animate] = useAnimate();

	useEffect(() => {
		let isCancelled = false;

		const runAnimation = async () => {
			let currentText = text;
			do {
				for (const action of script) {
					if (isCancelled) return;

					switch (action.type) {
						case "TypeText": {
							const { text, tick = DEFAULT_TYPE_SPEED } = action;
							const baseText = currentText;
							await animate(0, text.length, {
								duration: text.length * tick,
								ease: "linear",
								onUpdate: (latest) => {
									if (isCancelled) return;
									currentText = baseText + text.slice(0, Math.round(latest));
									setText(currentText);
								},
							});
							break;
						}

						case "DeleteText": {
							const { chars, tick = DEFAULT_DELETE_SPEED } = action;
							const baseText = currentText;
							const charsToDelete = Math.min(baseText.length, chars);
							if (charsToDelete === 0) break;
							await animate(0, charsToDelete, {
								duration: charsToDelete * tick,
								ease: "linear",
								onUpdate: (latest) => {
									if (isCancelled) return;
									currentText = baseText.slice(
										0,
										baseText.length - Math.round(latest),
									);
									setText(currentText);
								},
							});
							break;
						}

						case "Pause": {
							await new Promise((resolve) =>
								setTimeout(resolve, action.seconds * 1000),
							);
							break;
						}
					}
				}
			} while (repeat && !isCancelled);
		};

		runAnimation();

		return () => {
			isCancelled = true;
		};
	}, [script, animate, repeat]);

	return (
		<span className={`${className} relative min-w-8`}>
			{text}
			<Cursor />
		</span>
	);
}

function Cursor() {
	return (
		<motion.span
			animate={{ opacity: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0] }}
			transition={{ duration: 1, repeat: Infinity, ease: "backInOut" }}
			style={{ color: "inherit", minWidth: "2px", height: "100%" }}
			className="bg-white absolute right-[-2px]"
		/>
	);
}
