import { pinnedResume } from "~/data/resume";
import ReactMarkdown from "react-markdown";
import { SectionHeader } from "./SectionHeader";
import { dedent, formatDateRange } from "~/util";
import { twMerge } from "tailwind-merge";

export function Timeline() {
	const title = "Timeline";
	const description = dedent`
		Since finishing my degree in Media Computer Science in 2015,
		I worked with starups and big cooperations alike, combining
		design thinking and creative problem solving with broad
		technical expertise.
	`;
	return (
		<div id="about" className="section border-t space-y-12">
			<SectionHeader title={title} description={description} />
			{pinnedResume.map((entry, index) => (
				<div
					key={index}
					className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-x-12"
				>
					<div
						className={twMerge(
							"col-span-2 gap-x-4 items-start",
							"grid grid-cols-[20px_1fr] sm:grid-cols-[32px_1fr] grid-rows-[min-content]",
						)}
					>
						<div className="w-[12px] h-[12px] bg-white m-2" />
						<h6 className="col-start-2">{entry.institution}</h6>
						<p className="col-start-2">
							{entry.role}
							<br />
							{formatDateRange(entry.begin, entry.end)}
						</p>
					</div>
					<div className="col-span-2 space-y-2 ml-[34px] sm:ml-[46px] lg:ml-0">
						<ReactMarkdown>{entry.details}</ReactMarkdown>
					</div>
				</div>
			))}
		</div>
	);
}
