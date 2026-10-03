import ReactMarkdown, { type Components } from "react-markdown";

type MarkdownProps = React.ComponentProps<typeof ReactMarkdown>;

const components: Components = {
    strong: ({ children }) => <strong className="font-normal text-gray-200">{children}</strong>,
    em: ({ children }) => <strong className="font-normal text-gray-200">{children}</strong>,
};

export function Markdown({ children }: MarkdownProps) {
    return <ReactMarkdown components={components}>{children}</ReactMarkdown>;
}
