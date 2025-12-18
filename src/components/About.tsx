import { pinnedResume } from "~/data/resume";
import ReactMarkdown from "react-markdown";
import { SectionHeader } from "./SectionHeader";
import { dedent } from "~/util";

function formatDateRange(begin: string, end: string | null) {
	const beginYear = new Date(begin).getFullYear();
	const endYearOrPresent = end ? new Date(end).getFullYear() : "PRESENT";
	if (beginYear === endYearOrPresent) return beginYear;
	return `${beginYear} — ${endYearOrPresent}`;
}

export function About() {
	const title = "Timeline";
	const description = dedent`
		Since finishing my degree in Media Computer Science in 2015,
		I worked with starups and big cooperations alike, combining
		design thinking and creative problem solving with broad
		technical expertise.
	`;
	return (
		<div id="about" className="section py-20 border-t space-y-12">
			<SectionHeader title={title} description={description} />
			<div className="flex">
				<img
					src="/images/dude.gif"
					width="64"
					height="64"
					className="pixel-art"
				/>
			</div>
			{pinnedResume.map((entry, index) => (
				<div
					key={index}
					className="grid grid-cols-2 md:grid-cols-4 not-md:gap-6 md:gap-x-12"
				>
					<div className="col-span-2 grid grid-cols-[32px_1fr] grid-rows-[min-content] gap-x-4 items-start">
						<div className="w-[12px] h-[12px] bg-white m-2" />
						<h6 className="col-start-2">{entry.institution}</h6>
						<p className="col-start-2">
							{entry.role}
							<br />
							{formatDateRange(entry.begin, entry.end)}
						</p>
					</div>
					<div className="col-span-2 space-y-2 not-md:ml-[46px]">
						<ReactMarkdown>{entry.details}</ReactMarkdown>
					</div>
				</div>
			))}
		</div>
	);
}
