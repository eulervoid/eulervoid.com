import { createFileRoute } from "@tanstack/react-router";
import { timeline } from "@src/data/timeline";
import { work } from "@src/data/work";
import { profile } from "@src/data/shared";

export const Route = createFileRoute("/data")({
    server: {
        handlers: {
            GET: async () => {
                return Response.json({
                    profile,
                    work,
                    timeline,
                });
            },
        },
    },
});
