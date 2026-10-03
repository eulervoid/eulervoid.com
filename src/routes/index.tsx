import { createFileRoute } from "@tanstack/react-router";
import { Timeline } from "@src/components/Timeline";
import { Hero } from "@src/components/Hero";
import { Work } from "@src/components/Work";
import { work } from "@src/data/work";

async function preloadImage(src: string) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = reject;
    });
}

export const Route = createFileRoute("/")({
    component: Home,
    head: () => ({
        meta: [],
        links: [
            { rel: "canonical", href: "https://eulervoid.com/" },
            { rel: "alternate", href: "/llms.txt", type: "text/plain" },
        ],
    }),
    loader: async () => {
        if (import.meta.env.SSR) return;

        const workImages = work
            .flatMap((entry) => entry.media)
            .filter((media) => media.type === "image" && media.url)
            .map((media) => media.url!);

        workImages.forEach((url) => preloadImage(url));
    },
});

function Home() {
    return (
        <div className="relative">
            <Hero />
            <Work entries={work} />
            <Timeline />
        </div>
    );
}
