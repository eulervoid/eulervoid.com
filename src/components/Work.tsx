import { Desktop } from "./Desktop";
import { useRef, useMemo } from "react";
import { SectionHeader } from "./SectionHeader";
import { createRng } from "~/util";

type WorkProps = {
	seed?: number;
};

const WINDOW_DATA = [
	{
		title: "objekt klein a",
		imageUrl: "/images/smileys-dit.png",
	},
	{
		title: "Virtual Club",
		imageUrl: "/images/smileys-dit.png",
	},
	{
		title: "Some Other Project",
		imageUrl: "/images/smileys-dit.png",
	},
	{
		title: "Enerithm",
		imageUrl: "/images/smileys-dit.png",
	},
	{
		title: "Holy Poly",
		imageUrl: "/images/smileys-dit.png",
	},
];

export function Work({ seed = 42 }: WorkProps) {
	const containerRef = useRef(null);

	const windows = useMemo(() => {
		const rng = createRng(seed);
		return WINDOW_DATA.map((w) => ({
			...w,
			size: {
				width: 700 + (rng() - 0.5) * 100,
				height: 500 + (rng() - 0.5) * 200,
			},
		}));
	}, [seed]);

	return (
		<div
			id="work"
			className="relative space-y-12 min-h-screen"
			ref={containerRef}
		>
			<div className="section pt-20 pb-6 grid grid-cols-4 gap-x-12 gap-y-3 border-b z-200 bg-black sticky">
				<SectionHeader title="Work" />
			</div>
			<Desktop windows={windows} />
		</div>
	);
}
