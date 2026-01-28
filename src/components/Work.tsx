import { Desktop } from "./Desktop";
import { useRef } from "react";
import { SectionHeader } from "./SectionHeader";
import { type WorkEntry } from "~/data/work";

type WorkProps = {
	entries: WorkEntry[];
};

export function Work({ entries }: WorkProps) {
	const containerRef = useRef(null);

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
			<Desktop entries={entries} />
		</div>
	);
}
