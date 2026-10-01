import { dedent } from "@src/util";

export interface ResumeLink {
    url: string;
    text: string;
}

export interface ResumeEntry {
    begin: string;
    end: string | null;
    type?: string;
    role: string;
    institution: string;
    details: string;
    technology?: TechnologyEntry;
    link?: ResumeLink;
    links?: ResumeLink[];
    pinned?: boolean;
}

export type TechnologyEntry = {
    languages?: string[];
    libraries?: string[];
    software?: string[];
    services?: string[];
};

export const resume: ResumeEntry[] = [
    {
        begin: "2007-10-01",
        end: "2015-07-01",
        type: "Education",
        role: "Diploma in Media Computer Science",
        institution: "Technical University of Dresden",
        details: dedent`
            Specializations:
            - Media Technology and Design
            - Development Methods and Tools
            - System Architecture
            - Art and Design (Minor)

            Thesis: *Zykloid: A Visual Approach to Drum Synthesis*  
            (grade: 1.0)

            Degree: **Diplom-Medieninformatiker**  
            (overall grade: 1.3)
        `,
        technology: {
            languages: ["C++"],
            libraries: ["JUCE"],
        },
    },
    {
        begin: "2011-02-01",
        end: "2011-08-31",
        role: "Software Engineer",
        institution: "a.s.t.i. GmbH",
        details: dedent`
            Developed full-stack web and mobile apps, internal tools, and dashboards for a wide range of clients.
        `,
        technology: {
            languages: ["JavaScript", "C++"],
            libraries: ["Sails.js", "Angular", "Cordova", "Qt5"],
        },
    },
    {
        begin: "2013-02-01",
        end: "2014-02-28",
        role: "Student Assistant",
        institution: "Chair of Media Design, TU Dresden",
        details: dedent`
            Developed interactive presentation software and technology demos for trade fairs.
        `,
        technology: {
            languages: ["C++"],
            libraries: ["libcinder"],
        },
    },
    {
        begin: "2014",
        end: null,
        type: "Startup",
        role: "Co-Founder, Art Director",
        institution: "objekt klein a UG",
        details: dedent`
            Developed the brand identity and designed digital and print materials for
            *objekt klein a*, a collectively run nightclub and cultural space, often using
            generative techniques.
        `,
        links: [
            {
                url: "https://objektkleina.com",
                text: "objektkleina.com",
            },
        ],
        technology: {
            languages: ["Python", "Processing", "Kotlin", "Rust"],
            software: ["Adobe Illustrator", "Blender"],
        },
    },
    {
        begin: "2016-10-01",
        end: "2021-02-01",
        type: "Startup",
        role: "Co-Founder, Lead Developer",
        institution: "Wave Casual UG",
        details: dedent`
            Led development across the company's projects:

            - Designed, developed, and shipped Nylon, a synthesizer plugin built around a novel geometric oscillator; received coverage in MusicRadar, Gearnews, and Synth Anatomy
            - Planned, built, and deployed cloud services supporting Nylon's payment system and social features
            - Prototyped an AI-based audio plugin for a client in the film industry
        `,
        technology: {
            languages: ["C++", "FAUST", "TypeScript"],
            libraries: ["JUCE", "Koa.js"],
            software: ["Figma", "PostgreSQL"],
            services: ["AWS", "DigitalOcean"],
        },
        links: [
            {
                url: "https://github.com/eulervoid/nylon",
                text: "github.com/eulervoid/nylon",
            },
        ],
        pinned: true,
    },
    {
        begin: "2019-06-01",
        end: "2021-12-01",
        type: "Freelance",
        role: "Freelance Software Engineer",
        institution: "Concordium AG",
        details: dedent`
            Built dashboards and interactive visualizations of blockchain infrastructure in Elm and SVG.
        `,
        links: [
            {
                url: "https://concordium.com",
                text: "concordium.com",
            },
        ],
        technology: {
            languages: ["Elm", "TypeScript"],
            software: ["Figma"],
        },
    },
    {
        begin: "2021-02-01",
        end: "2021-10-01",
        type: "Freelance",
        role: "Freelance Software Engineer",
        institution: "Centre for Tactile Internet, TU Dresden",
        details: dedent`
            Built promotional technology demos in Unity:

            - An animated 3D avatar that mirrored a live performance by a pianist wearing a motion-capture suit
            - A surfing minigame controlled with a real surfboard
        `,
        links: [
            {
                url: "https://ceti.one/",
                text: "ceti.one",
            },
        ],
        technology: {
            languages: ["C#", "Python"],
            software: ["TouchDesigner", "Unity", "Blender"],
        },
        pinned: true,
    },
    {
        begin: "2020-12-01",
        end: "2022-12-01",
        type: "Freelance",
        role: "Freelance Software Engineer",
        institution: "objekt klein a e.V.",
        details: dedent`
            Designed and developed the *Virtual Club*, a digital recreation of *objekt klein a*,
            where users could fly around as smiley avatars, listen to DJ sets, chat, and explore
            digital exhibitions. During the COVID-19 lockdowns, the Virtual Club hosted *14 events*
            featuring international DJs and artists, with up to *500 concurrent users*.
            The project received the *Applaus Award for Innovation* in 2022.
	`,
        technology: {
            languages: ["TypeScript", "Rust"],
            libraries: ["SolidJS", "BabylonJS", "Tokio", "Axum"],
            software: ["Figma", "Blender", "Meshroom"],
        },
        links: [
            { url: "https://objektkleina.com", text: "objektkleina.com" },
            { url: "https://www.youtube.com/watch?v=oKXnjmGDuNo", text: "Applaus Award Video" },
        ],
        pinned: true,
    },
    {
        begin: "2021-12-01",
        end: "2023-10-01",
        type: "Freelance",
        role: "Freelance Software Engineer",
        institution: "HolyPoly GmbH",
        details: dedent`
            Built interactive prototypes and websites supporting recycling campaigns for clients
            in the plastics industry, from landing pages to minigames.
        `,
        technology: {
            languages: ["TypeScript"],
            libraries: ["React", "Astro", "BabylonJS"],
            software: ["Figma"],
        },
        links: [{ url: "https://www.holypoly.com", text: "holypoly.com" }],
        pinned: true,
    },
    {
        begin: "2023-08-01",
        end: "2025-01-01",
        type: "Freelance",
        role: "Freelance Creative Technologist",
        institution: "Chaos Computer Club",
        details: dedent`
            Collaborated with RoboKid to design style guides, merchandise, and generative title animations
            for *37C3* and *38C3*, editions of the *Chaos Communication Congress* that each attracted
            approximately 15,000 attendees.
        `,
        technology: {
            languages: ["Rust", "Python"],
            libraries: ["bpy", "ffmpeg"],
            software: ["Blender", "Figma", "Affinity"],
        },
        links: [
            {
                text: "37C3 Styleguide",
                url: "https://events.ccc.de/congress/2023/infos/styleguide/styleguide.pdf",
            },
            {
                text: "38C3 Styleguide",
                url: "https://events.ccc.de/congress/2024/infos/styleguide/38c3-styleguide-v2.pdf",
            },
        ],
        pinned: true,
    },
    {
        begin: "2024-01-01",
        end: "2025-03-30",
        type: "Freelance",
        role: "Freelance Lead Engineer, Acting CTO",
        institution: "Enerithm Technology GmbH",
        details: dedent`
            Led technical development of *Energuide*, an AI-based energy-efficiency platform at a seed-stage
            startup, managing a team of four engineers:

            - Took the product from concept to a live MVP with its first customers, including large real estate agencies
            - Owned system architecture, chatbot development, data pipelines, evaluation, testing, and continuous deployment
            - Designed the UI/UX and hired engineers to expand the team as demand grew
        `,
        links: [
            {
                url: "https://enerithm.com",
                text: "enerithm.com",
            },
        ],
        technology: {
            languages: ["Python", "TypeScript"],
            libraries: ["FastAPI", "PydanticAI", "React"],
            software: ["PostgreSQL", "Nomad", "Figma"],
            services: ["Hetzner Cloud"],
        },
        pinned: true,
    },
    {
        begin: "2025-06-01",
        end: "2026-02-28",
        type: "Freelance",
        role: "Freelance Software Engineer",
        institution: "Myceli.AI",
        details: dedent`
            Led stack modernization and development of new payment infrastructure for *pollinations.ai*,
            an open generative media API with more than 17,000 Discord members and over 500 apps built on it:

            - Ported existing generation services to TypeScript
            - Added a Cloudflare Workers authentication proxy in front of the generation APIs, with automatically generated OpenAPI documentation
            - Implemented usage metering for text and image APIs, with end-to-end tracing from request to billing
            - Built a batching cache that processed millions of events per day while keeping billing writes below the provider's limit of 100 requests per second
            - Implemented credits and invoicing through Polar.sh
        `,
        links: [
            { url: "https://pollinations.ai", text: "pollinations.ai" },
            { url: "https://myceli.ai", text: "myceli.ai" },
        ],
        technology: {
            languages: ["TypeScript"],
            libraries: ["Hono", "React", "TanStack"],
            services: ["Polar.sh", "Cloudflare", "Clickhouse"],
        },
        pinned: true,
    },
].reverse();
