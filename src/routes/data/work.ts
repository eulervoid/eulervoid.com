import { createFileRoute } from "@tanstack/react-router";
import { work } from "@src/data/work";

export const Route = createFileRoute("/data/work")({
    server: {
        handlers: {
            GET: async () => {
                return Response.json(work);
            },
        },
    },
});
