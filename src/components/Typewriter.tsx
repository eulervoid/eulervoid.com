import { useEffect, useState } from "react";
import { useAnimate, motion } from "motion/react";

type WriteText = {
    type: "WriteText";
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

export type Script = (WriteText | DeleteText | Pause)[];

export type TypewriterProps = {
    script: Script;
    className?: string;
    repeat?: boolean;
    initialText?: string;
    defaultWriteTick?: number;
    defaultDeleteTick?: number;
};

type ScriptStepOpts = {
    tick?: number;
    pauseAfter?: number;
};

type ScriptChainOpts = {
    pauseAfterWrite?: number;
    pauseAfterDelete?: number;
};

export function writeText(text: string, opts: ScriptStepOpts = {}): Script {
    const { tick, pauseAfter } = opts;
    return [{ type: "WriteText", text, tick }, ...pause(pauseAfter || 0)];
}

export function deleteText(chars?: number, opts: ScriptStepOpts = {}): Script {
    const { tick, pauseAfter } = opts;
    chars = chars && chars > 0 ? chars : 1000;
    return [{ type: "DeleteText", chars, tick }, ...pause(pauseAfter || 0)];
}

export function pause(seconds: number): Script {
    return seconds > 0 ? [{ type: "Pause", seconds }] : [];
}

export function chain(scripts: Script[], opts: ScriptChainOpts) {
    const { pauseAfterWrite, pauseAfterDelete } = opts;
    return scripts.reduce((acc, current) => {
        const lastStep = acc.at(-1);
        let defaultPause: Script = [];
        if (lastStep && lastStep.type === "WriteText") defaultPause = pause(pauseAfterWrite || -1);
        if (lastStep && lastStep.type === "DeleteText")
            defaultPause = pause(pauseAfterDelete || -1);
        return [...acc, ...defaultPause, ...current];
    }, []);
}

export function Typewriter({
    script,
    className,
    repeat = false,
    initialText = "",
    defaultWriteTick = 0.1,
    defaultDeleteTick = 0.05,
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
                        case "WriteText": {
                            const { text, tick = defaultWriteTick } = action;
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
                            const { chars, tick = defaultDeleteTick } = action;
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
