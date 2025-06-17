import { motion } from "framer-motion";

export type WindowState = {
	title: string;
	imageUrl: string;
	closed: boolean;
	position: {
		top: number;
		left: number;
	};
	size: {
		width: number;
		height: number;
	};
	zIndex: number;
};

type WindowProps = WindowState & {
	onClick?: any;
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

export function Window({
	title,
	imageUrl,
	position,
	size,
	zIndex,
	closed = false,
}: WindowProps) {
	return (
		<motion.div
			className="border absolute bg-black text-gray-300"
			style={{ ...position, ...size, zIndex }}
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
			<div style={{ width: "100%", height: `calc(100% - ${TOPBAR_HEIGHT}px)` }}>
				<img src={imageUrl} className="w-full h-full object-cover" />
			</div>
		</motion.div>
	);
}

export function closeButtonPosition(window: WindowProps) {
	return { x: window.position.left + 5, y: window.position.top + 11 };
}
