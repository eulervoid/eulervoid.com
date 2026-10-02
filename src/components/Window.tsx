import { motion } from "motion/react";
import { forwardRef, PropsWithChildren, useImperativeHandle, useRef } from "react";
import { twMerge } from "tailwind-merge";

type WindowTopbarProps = {
    title: string;
    showCloseButton?: boolean;
};

type WindowTopbarHandle = {
    getCloseButton: () => HTMLImageElement | null;
};

type WindowProps = PropsWithChildren<{
    title: string;
    showCloseButton?: boolean;
    closed: boolean;
    zIndex: number;
    onClick?: any;
    className?: string;
    animate?: any;
    transition?: any;
}>;

export type WindowHandle = {
    getCloseButton: () => HTMLImageElement | null;
    getWindow: () => HTMLDivElement | null;
};

const TOPBAR_HEIGHT = 32;

function TopbarSpacer() {
    return (
        <div className="grow flex flex-col gap-[4px]">
            {[...Array(3)].map((_, index) => (
                <span key={index} className="grow bg-gray-700 h-px" />
            ))}
        </div>
    );
}

export const WindowTopbar = forwardRef<WindowTopbarHandle, WindowTopbarProps>(
    ({ title, showCloseButton }, ref) => {
        const closeButtonRef = useRef<HTMLImageElement>(null);

        useImperativeHandle(ref, () => ({
            getCloseButton: () => closeButtonRef.current,
        }));

        return (
            <div
                className={twMerge(
                    "flex justify-between gap-2 items-center",
                    "border-b px-2 py-1",
                    `h-[${TOPBAR_HEIGHT}px]`,
                )}
            >
                {showCloseButton && (
                    <img
                        ref={closeButtonRef}
                        src="/images/close.png"
                        className="w-[14px] pixel-art object-contain cursor-pointer"
                    />
                )}
                <TopbarSpacer />
                {title}
                <TopbarSpacer />
            </div>
        );
    },
);

export const Window = forwardRef<WindowHandle, WindowProps>(
    (
        {
            title,
            showCloseButton = true,
            zIndex,
            closed = false,
            className = "",
            animate: extraAnimate = {},
            transition: extraTransition = {},
            children,
        },
        ref,
    ) => {
        const windowRef = useRef<HTMLDivElement>(null);
        const topbarRef = useRef<WindowTopbarHandle>(null);

        useImperativeHandle(ref, () => ({
            getCloseButton: () => topbarRef.current?.getCloseButton() || null,
            getWindow: () => windowRef.current,
        }));

        return (
            <motion.div
                ref={windowRef}
                className={twMerge(
                    "border bg-black text-gray-300 flex flex-col flex-1",
                    "overflow-hidden max-w-full divide-y",
                    "shadow-[6px_6px_0px_rgba(0,0,0,0.2)]",
                    className,
                )}
                style={{
                    width: "700px",
                    maxWidth: "100%",
                    zIndex,
                }}
                animate={{
                    opacity: closed ? 0 : 1,
                    scale: closed ? 0.8 : 1,
                    ...extraAnimate,
                }}
                transition={{
                    duration: 0.3,
                    ease: "easeOut",
                    ...extraTransition,
                }}
            >
                <WindowTopbar title={title} ref={topbarRef} showCloseButton={showCloseButton} />
                <div className="flex-1 min-h-20 divide-y">{children}</div>
            </motion.div>
        );
    },
);
