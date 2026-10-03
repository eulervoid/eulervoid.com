import { createFileRoute } from "@tanstack/react-router";
import { snippets } from "@src/data/shared";
import { timeline } from "@src/data/timeline";
import { work } from "@src/data/work";
import { formatDateRange } from "@src/util";

function homepageMarkdown() {
    const projects = work.map((entry) =>
        [
            `### ${entry.title}`,
            `${entry.client} · ${formatDateRange(entry.begin, entry.end)}`,
            entry.description.trim(),
            Object.entries(entry.technology)
                .map(([group, tags]) => `- **${group}:** ${tags.join(", ")}`)
                .join("\n"),
            entry.links.map((link) => `- [${link.label}](${link.href})`).join("\n"),
        ]
            .filter(Boolean)
            .join("\n\n"),
    );

    const highlights = timeline
        .filter((entry) => entry.pinned === true)
        .map((entry) =>
            [
                `### ${entry.institution.replace(/\s+/g, " ")}`,
                `${entry.role.replace(/\s+/g, " ")} · ${formatDateRange(entry.begin, entry.end)}`,
                entry.details.trim(),
            ].join("\n\n"),
        );

    return (
        [
            "# eulervoid.com",
            "Source: https://eulervoid.com/",
            "## Hello!",
            "I'm Josh, a software engineer and creative technologist based in Berlin.",
            "From first draft to execution, I can help you build ai systems, agents, apps, websites, and prototypes, that get you where you want to go.",
            "## Work",
            ...projects,
            "## Timeline",
            `I have ${snippets.experience.trim().replace(/\s+/g, " ")}`,
            ...highlights,
            "## Let's talk!",
            "Have a project in mind? I'll be happy to hear from you and explore together if it's a good fit.",
            "- [josh@eulervoid.com](mailto:josh@eulervoid.com)\n- [Github](https://github.com/eulervoid)\n- [Instagram](https://instagram.com/eulervoid)",
        ].join("\n\n") + "\n"
    );
}

export const Route = createFileRoute("/llms.txt")({
    server: {
        handlers: {
            GET: () =>
                new Response(homepageMarkdown(), {
                    headers: { "Content-Type": "text/plain; charset=utf-8" },
                }),
        },
    },
});
