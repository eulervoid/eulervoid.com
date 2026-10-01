import ReactMarkdown, { type Components } from "react-markdown";

const components: Components = {
    strong: ({ children }) => <strong className="font-normal text-gray-200">{children}</strong>,
    em: ({ children }) => <strong className="font-normal text-gray-200">{children}</strong>,
};

export function Markdown({ children }: { children: string }) {
    return <ReactMarkdown components={components}>{children}</ReactMarkdown>;
}
