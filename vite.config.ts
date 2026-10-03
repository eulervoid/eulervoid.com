import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { defineConfig, Plugin } from "vite";
import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import { imagetools } from "vite-imagetools";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { URLSearchParams } from "node:url";

function requireFiles(files: string[]): Plugin {
    return {
        name: "require-files",
        buildStart() {
            for (const filePath of files) {
                const fullPath = resolve(filePath);
                if (!existsSync(fullPath)) {
                    throw new Error(`Missing required file: ${filePath}`);
                }
            }
        },
    };
}

export default defineConfig({
    server: {
        port: 3000,
    },
    resolve: {
        tsconfigPaths: true,
    },
    envPrefix: ["PROFILE_"],
    plugins: [
        // Make sure paid fonts are present
        requireFiles([
            "assets/fonts/Mondwest-Regular.woff",
            "assets/fonts/Mondwest-Regular.woff2",
            "assets/fonts/DepartureMono-Regular.woff",
            "assets/fonts/DepartureMono-Regular.woff2",
        ]),
        imagetools({
            defaultDirectives: (url) => {
                if (url.searchParams.has("responsive-rgb")) {
                    return new URLSearchParams({
                        format: "webp;jpg",
                        webp: "85",
                        jpg: "80",
                        w: "400;800;1200",
                        as: "srcset",
                    });
                }
                if (url.searchParams.has("responsive-rgba")) {
                    return new URLSearchParams({
                        format: "webp;png",
                        webp: "85",
                        png: "6",
                        w: "400;800;1200",
                        as: "srcset",
                    });
                }
                return new URLSearchParams();
            },
        }),
        tanstackStart({
            pages: [{ path: "/llms.txt", prerender: { crawlLinks: false } }],
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
