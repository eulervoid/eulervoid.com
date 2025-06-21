import { pinnedResume } from "~/data/resume";
import ReactMarkdown from "react-markdown";

function formatDateRange(begin: string, end: string | null) {
	const beginYear = new Date(begin).getFullYear();
	const endYearOrPresent = end ? new Date(end).getFullYear() : "PRESENT";
	if (beginYear === endYearOrPresent) return beginYear;
	return `${beginYear} — ${endYearOrPresent}`;
}

export function About() {
	return (
		<div id="about" className="section py-20 border-t space-y-12">
			<div className="grid grid-cols-4 gap-x-12 gap-y-3">
				<h2>Timeline</h2>
				<p className="col-span-2 col-start-3">
					Since finishing my degree in Media Computer Science in 2015, I worked
					with starups and big cooperations alike, combining design thinking and
					creative problem solving with broad technical expertise.
				</p>
			</div>
			<div className="flex">
				<img
					src="/images/dude.gif"
					width="64"
					height="64"
					className="pixel-art"
				/>
			</div>
			{pinnedResume.map((entry, index) => (
				<div key={index} className="grid grid-cols-4">
					<div className="col-span-2 grid grid-cols-[max-content_1fr] grid-rows-[min-content] gap-x-5 items-start">
						<div className="w-[12px] h-[12px] bg-white m-2" />
						<h6 className="col-start-2">{entry.institution}</h6>
						<p className="col-start-2">
							{entry.role}
							<br />
							{formatDateRange(entry.begin, entry.end)}
						</p>
					</div>
					<div className="col-span-2 space-y-2">
						<ReactMarkdown>{entry.details}</ReactMarkdown>
					</div>
				</div>
			))}
		</div>
	);
}
