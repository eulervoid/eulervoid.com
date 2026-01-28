import { WorkEntry } from "~/data/work";
import { Taglist } from "./Taglist";
import ReactMarkdown from "react-markdown";
import { formatDateRange } from "~/util";

type WorkDetailsProps = {
	entry: WorkEntry;
};

export function WorkDetails({ entry }: WorkDetailsProps) {
	return (
		<div className="flex flex-col gap-12 px-5 py-5">
			<div className="flex flex-col gap-1">
				<h3>{entry.title}</h3>
				<div className="text-sm leading-nromal text-gray-500 mb-3">
					{entry.client}
					<br />
					{formatDateRange(entry.begin, entry.end)}
				</div>
				<ReactMarkdown>{entry.description}</ReactMarkdown>
			</div>
			<div className="grid grid-cols-5">
				<Taglist
					title="links"
					tags={entry.links}
					className="col-span-2"
				/>
				{Object.entries(entry.technology).map(
					([groupName, groupTags]) => (
						<Taglist title={groupName} tags={groupTags} />
					),
				)}
			</div>
		</div>
	);
}
