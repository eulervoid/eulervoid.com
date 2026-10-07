import {
    Markdown as TanStackMarkdown,
    type MarkdownComponents as TanStackMarkdownComponents,
    type MarkdownProps as TanStackMarkdownProps,
} from "@tanstack/markdown/react";

type MarkdownProps = Pick<TanStackMarkdownProps, "children">;

const components = {
    strong: ({ children }) => <strong className="font-normal text-gray-200">{children}</strong>,
    em: ({ children }) => <strong className="font-normal text-gray-200">{children}</strong>,
} satisfies TanStackMarkdownComponents;

export function Markdown({ children }: MarkdownProps) {
    return <TanStackMarkdown components={components}>{children}</TanStackMarkdown>;
}
