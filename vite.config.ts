import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { defineConfig, Plugin } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import { imagetools } from "vite-imagetools";
import { existsSync } from "fs";
import { resolve } from "path";

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
    plugins: [
        // Make sure paid fonts are present
        requireFiles([
            "public/fonts/Mondwest-Regular.woff",
            "public/fonts/Mondwest-Regular.woff2",
            "public/fonts/DepartureMono-Regular.woff",
            "public/fonts/DepartureMono-Regular.woff2",
        ]),
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
        imagetools({
            defaultDirectives: (url) => {
                if (url.searchParams.has('responsive')) {
                    return new URLSearchParams({
                        format: 'webp;jpg;png',
                        w: '400;800;1200',
                        as: 'srcset',
                    });
                }
                return new URLSearchParams();
            },
        }),
    ],
});
