import { Desktop } from "./Desktop";
import { useScroll, useMotionValueEvent } from "motion/react";
import { useRef } from "react";
import { ClickAnimator } from "./ClickAnimator";

const randomSize = () => ({
	width: 700 + (Math.random() - 0.5) * 100,
	height: 500 + (Math.random() - 0.5) * 200,
});

const windows = [
	{
		title: "objekt klein a",
		imageUrl: "/images/smileys-dit.png",
		size: randomSize(),
	},
	{
		title: "Virtual Club",
		imageUrl: "/images/smileys-dit.png",
		size: randomSize(),
	},
	{
		title: "Some Other Project",
		imageUrl: "/images/smileys-dit.png",
		size: randomSize(),
	},
	{
		title: "Enerithm",
		imageUrl: "/images/smileys-dit.png",
		size: randomSize(),
	},
	{
		title: "Holy Poly",
		imageUrl: "/images/smileys-dit.png",
		size: randomSize(),
	},
];

export function Work() {
	const containerRef = useRef(null);

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end end"],
	});

	useMotionValueEvent(scrollYProgress, "change", (value) => {
		console.log(value);
	});

	return (
		<div
			id="work"
			className="section py-20 border-t space-y-12 h-[300vh]"
			ref={containerRef}
		>
			<div className="sticky top-0 h-screen flex flex-col justify-center space-y-12">
				<h2>Work</h2>
				<Desktop windows={windows} progress={scrollYProgress} />
			</div>
		</div>
	);
}
