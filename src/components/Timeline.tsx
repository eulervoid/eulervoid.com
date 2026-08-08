import { resume } from "@src/data/resume";
import ReactMarkdown from "react-markdown";
import { SectionHeader } from "./SectionHeader";
import { dedent, formatDateRange } from "@src/util";
import { twMerge } from "tailwind-merge";
import { Taglist } from "./Taglist";

type Props = {
    title?: string;
    description?: string;
    showAll?: boolean;
    showTechnology?: boolean;
};

export function Timeline(props: Props) {
    const title = props.title || "Timeline";
    const description =
        props.description ||
        dedent`
            Since finishing my degree in Media Computer Science in 2015,
            I worked with starups and big cooperations alike, combining
            design thinking and creative problem solving with broad
            technical expertise.
	`;
    const entries = props.showAll ? resume : resume.filter((entry) => entry.pinned === true);
    return (
        <div id="timeline" className="section border-t space-y-24 print:space-y-2 print:border-t-0">
            <SectionHeader title={title} description={description} />
            {entries.map((entry, index) => (
                <div
                    key={index}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 break-inside-avoid"
                >
                    <div className="grid grid-cols-[min-content_1fr] col-span-2 gap-x-1 sm:gap-x-4 items-start">
                        <div className="w-3 h-3 bg-white m-2" />
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
                        <ReactMarkdown>{entry.details}</ReactMarkdown>
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
