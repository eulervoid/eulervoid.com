import { createFileRoute } from "@tanstack/react-router";
import { resume } from "@src/data/resume";

export const Route = createFileRoute("/data/resume")({
    server: {
        handlers: {
            GET: async () => {
                return Response.json(resume);
            },
        },
    },
});
