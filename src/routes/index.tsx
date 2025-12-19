import { createFileRoute } from "@tanstack/react-router";
import { Timeline } from "~/components/Timeline";
import { Hero } from "~/components/Hero";
import { Work } from "~/components/Work";

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	return (
		<div className="relative">
			<Hero />
			<Work />
			<Timeline />
		</div>
	);
}
