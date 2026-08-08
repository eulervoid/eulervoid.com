import { twMerge } from "tailwind-merge";
import { Link } from "@src/data/work";

type TaglistProps = {
    title: string;
    tags: (string | Link)[];
    className?: string;
};

export function Taglist({ title, tags, className }: TaglistProps) {
    return (
        <div className={twMerge("flex flex-col text-xs leading-normal text-gray-500", className)}>
            <span className="text-gray-400 mb-1">{title.toUpperCase()}</span>
            {tags.map((tag, index) => {
                if (typeof tag === "string") {
                    return <span key={index}>{tag}</span>;
                } else {
                    return (
                        <a key={index} href={tag.href} className="hover:text-lime-300">
                            {tag.label}
                        </a>
                    );
                }
            })}
        </div>
    );
}
