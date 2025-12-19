import { motion } from "motion/react";
import { forwardRef, useImperativeHandle, useRef } from "react";

type WindowTopbarProps = {
	title: string;
	showCloseButton?: boolean;
};

type WindowTopbarHandle = {
	getCloseButton: () => HTMLImageElement | null;
};

type WindowProps = {
	title: string;
	showCloseButton?: boolean;
	imageUrl: string;
	closed: boolean;
	size: {
		width: number;
		height: number;
	};
	zIndex: number;
	onClick?: any;
	className?: string;
	animate?: any;
	transition?: any;
};

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
				className="flex justify-between gap-2 items-center border-b px-2 py-1 shrink-0"
				style={{ height: TOPBAR_HEIGHT }}
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
			imageUrl,
			size,
			zIndex,
			closed = false,
			className = "",
			animate: extraAnimate = {},
			transition: extraTransition = {},
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
				className={`border bg-black text-gray-300 flex flex-col shadow-[6px_6px_0px_rgba(0,0,0,0.2)] ${className}`}
				style={{
					width: size.width,
					maxWidth: "100%",
					aspectRatio: `${size.width} / ${size.height}`,
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
				<WindowTopbar
					title={title}
					ref={topbarRef}
					showCloseButton={showCloseButton}
				/>
				<div className="grow overflow-hidden">
					<img
						src={imageUrl}
						className="w-full h-full object-cover"
					/>
				</div>
				<div className="flex justify-between gap-2 items-center border-t px-2 py-2 shrink-0">
					test
				</div>
				<div className="flex justify-between gap-2 items-center border-t px-2 py-2 shrink-0">
					test
				</div>
			</motion.div>
		);
	},
);
