import { createFileRoute } from "@tanstack/react-router";
import { About } from "~/components/About";
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
			<About />
		</div>
	);
}
