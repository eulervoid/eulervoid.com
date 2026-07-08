import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { defineConfig, Plugin } from "vite";
import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import { imagetools } from "vite-imagetools";
import { copyFileSync, existsSync } from "node:fs";
import { resolve, join, basename } from "node:path";
import { URLSearchParams } from "url";

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

function copyFiles(options: { files: string[] }): Plugin {
    return {
        name: "copy-files",
        closeBundle() {
            const targets = ["dist/client/assets"];
            for (const fileSrc of options.files) {
                const filename = basename(fileSrc);
                for (const targetDir of targets) {
                    const fileDest = join(targetDir, filename);
                    copyFileSync(fileSrc, fileDest);
                    console.log(`Copied ${fileSrc} to ${fileDest}`);
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
        // Copy .htaccess to assets for font protection
        copyFiles({
            files: ["assets/fonts/.htaccess"],
        }),
    ],
});
