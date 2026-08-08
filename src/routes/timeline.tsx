import { createFileRoute } from "@tanstack/react-router";
import { Timeline as TimelineComponent } from "@src/components/Timeline";

export const Route = createFileRoute("/timeline")({
    component: Timeline,
    head: () => ({
        meta: [],
    }),
    loader: async () => {},
});

function Timeline() {
    return (
        <div className="relative">
            <TimelineComponent showAll showTechnology chonological />
        </div>
    );
}
