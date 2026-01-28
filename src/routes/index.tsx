import { createFileRoute } from "@tanstack/react-router";
import { Timeline } from "~/components/Timeline";
import { Hero } from "~/components/Hero";
import { Work } from "~/components/Work";
import { work } from "~/data/work";

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
	}),
	loader: async () => {
		if (import.meta.env.SSR) return;

		const workImages = work
			.flatMap((entry) => entry.media)
			.filter((media) => media.type === "image")
			.map((media) => media.url);

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
