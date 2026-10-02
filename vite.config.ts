import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";

export default defineConfig({
    server: {
        port: 3000,
        watch: {
            // Use polling to fix HMR in some environments
            usePolling: true,
        },
    },
    plugins: [
        tsConfigPaths({
            projects: ["./tsconfig.json"],
        }),
        tanstackStart({
            prerender: {
                enabled: true,
                crawlLinks: true,
            },
            sitemap: {
                enabled: true,
                host: "https://eulervoid.com",
            },
        }),
        tailwindcss(),
        viteReact(),
    ],
});
