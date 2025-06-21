import { motion } from "motion/react";
import { forwardRef } from "react";

type WindowProps = {
	title: string;
	imageUrl: string;
	closed: boolean;
	size: {
		width: number;
		height: number;
	};
	zIndex: number;
	onClick?: any;
	className?: string;
};

const TOPBAR_HEIGHT = 32;

function TopbarSpacer() {
	return (
		<div className="flex-grow flex flex-col gap-[4px]">
			{[...Array(3)].map((_, index) => (
				<span key={index} className="flex-grow bg-gray-700 h-[1px]" />
			))}
		</div>
	);
}

export const Window = forwardRef<HTMLDivElement, WindowProps>(
	({ title, imageUrl, size, zIndex, closed = false, className = "" }, ref) => {
		return (
			<motion.div
				ref={ref}
				className={`border bg-black text-gray-300 ${className}`}
				style={{ ...size, zIndex }}
				animate={{
					opacity: closed ? 0 : 1,
					scale: closed ? 0.8 : 1,
				}}
				transition={{
					duration: 0.3,
					ease: "easeOut",
				}}
			>
				<div
					className="flex justify-between gap-2 items-center border-b px-2 py-1"
					style={{ height: TOPBAR_HEIGHT }}
				>
					<img
						src="/images/close.png"
						className="w-[14px] pixel-art object-contain"
					/>
					<TopbarSpacer />
					{title}
					<TopbarSpacer />
				</div>
				<div
					style={{ width: "100%", height: `calc(100% - ${TOPBAR_HEIGHT}px)` }}
				>
					<img src={imageUrl} className="w-full h-full object-cover" />
				</div>
			</motion.div>
		);
	},
);

export function closeButtonPosition(position: { top: number; left: number }) {
	return { x: position.left + 5, y: position.top + 11 };
}
