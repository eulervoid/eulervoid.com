import { Desktop } from "./Desktop";
import { useScroll } from "motion/react";
import { useRef } from "react";

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
		offset: [-0.1, 1.5],
		axis: "y",
	});

	return (
		<div
			id="work"
			className="relative border-t space-y-12 min-h-screen"
			ref={containerRef}
		>
			<div className="section pt-20 pb-6 grid grid-cols-4 gap-x-12 gap-y-3 border-b z-200 bg-black sticky">
				<h2>Work</h2>
				<p className="col-span-2 col-start-3">
					Since finishing my degree in Media Computer Science in 2015, I worked
					with starups and big cooperations alike, combining design thinking and
					creative problem solving with broad technical expertise.
				</p>
			</div>
			<Desktop windows={windows} progress={scrollYProgress} />
		</div>
	);
}
