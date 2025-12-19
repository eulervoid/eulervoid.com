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
		imageUrl: "/images/work/futur01/futur01-01.jpg",
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
			style={{
				backgroundImage:
					"radial-gradient(circle, rgb(30 40 56) 1px, transparent 1px)",
				backgroundSize: "32px 32px",
				backgroundPosition: "center center",
			}}
			className="section border-t"
			ref={containerRef}
		>
			<SectionHeader title="Work" className="mb-12" />
			<Desktop windows={windows} />
		</div>
	);
}
