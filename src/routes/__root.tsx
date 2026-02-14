/// <reference types="vite/client" />
import { HeadContent, Outlet, Scripts, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import * as React from "react";
import { DefaultCatchBoundary } from "@src/components/DefaultCatchBoundary";
import { Footer } from "@src/components/Footer";
import { Navigation } from "@src/components/Navigation";
import { NotFound } from "@src/components/NotFound";
import appCss from "@src/styles/app.css?url";
import { seo } from "@src/utils/seo";

export const Route = createRootRoute({
    head: () => ({
        meta: [
            {
                charSet: "utf-8",
            },
            {
                name: "viewport",
                content: "width=360, initial-scale=1",
            },
            ...seo({
                title: "Euler Void — A fictional emptiness.",
                description: `Hello, I'm Josh, a Software Engineer and creative technologist based in Berlin.`,
            }),
        ],
        links: [
            { rel: "stylesheet", href: appCss },
            {
                rel: "apple-touch-icon",
                sizes: "180x180",
                href: "/apple-touch-icon.png",
            },
            {
                rel: "icon",
                type: "image/png",
                sizes: "32x32",
                href: "/favicon-32x32.png",
            },
            {
                rel: "icon",
                type: "image/png",
                sizes: "16x16",
                href: "/favicon-16x16.png",
            },
            { rel: "manifest", href: "/site.webmanifest", color: "#ffffff" },
            { rel: "icon", href: "/favicon.ico" },
        ],
        scripts: [],
    }),
    errorComponent: (props) => {
        return (
            <RootDocument>
                <DefaultCatchBoundary {...props} />
            </RootDocument>
        );
    },
    notFoundComponent: () => <NotFound />,
    component: RootComponent,
});

function RootComponent() {
    return (
        <React.StrictMode>
            <RootDocument>
                <Outlet />
            </RootDocument>
        </React.StrictMode>
    );
}

function RootDocument({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <HeadContent />
            </head>
            <body>
                <Navigation />
                {children}
                <Footer />
                <TanStackRouterDevtools position="bottom-right" />
                <Scripts />
            </body>
        </html>
    );
}
