import { resume } from "@src/data/resume";
import { dedent, formatDateRange } from "@src/util";
import { SectionHeader } from "./SectionHeader";
import { Taglist } from "./Taglist";
import { snippets } from "@src/data/shared";
import { Markdown } from "./Markdown";

type Props = {
    title?: string;
    description?: string;
    showAll?: boolean;
    showTechnology?: boolean;
    chonological?: boolean;
};

export function Timeline(props: Props) {
    const title = props.title || "Timeline";
    const description =
        props.description ||
        dedent`
            I have ${snippets.experience}
	`;
    const entries = props.showAll ? resume : resume.filter((entry) => entry.pinned === true);
    if (props.chonological) {
        entries.sort((a, b) => a.begin.localeCompare(b.begin));
    }

    return (
        <div
            id="timeline"
            className="section border-t space-y-24 print:space-y-16 print:border-t-0"
        >
            <SectionHeader title={title} description={description} />
            {entries.map((entry, index) => (
                <div
                    key={index}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 break-inside-avoid"
                >
                    <div className="grid grid-cols-[min-content_1fr] col-span-2 gap-x-1 sm:gap-x-4 items-start">
                        <div className="w-3 h-3 bg-white m-2">
                            <svg
                                className="hidden print:block inset-0 h-full w-full"
                                aria-hidden="true"
                                viewBox="0 0 100 100"
                            >
                                <rect width="100" height="100" fill="#000" />
                            </svg>
                        </div>
                        <div className="items-start">
                            <h6 className="col-start-2">{entry.institution}</h6>
                            <p className="col-start-2">
                                {entry.role}
                                <br />
                                {formatDateRange(entry.begin, entry.end)}
                            </p>
                        </div>
                    </div>
                    <div className="col-span-2 space-y-2 ml-8 sm:ml-11.5 md:ml-0">
                        <Markdown>{entry.details}</Markdown>
                        {props.showTechnology && (
                            <div className="grid grid-cols-4 gap-6 mt-7">
                                {Object.entries(entry.technology || {}).map(
                                    ([groupName, groupTags]) => (
                                        <Taglist
                                            key={groupName}
                                            title={groupName}
                                            tags={groupTags}
                                            className="col-span-1"
                                        />
                                    ),
                                )}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
