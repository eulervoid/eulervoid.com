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
            Specialization:
            - Media Technology and Design
            - Development Methods and Tools
            - System Architecture
            - Art and Design (Minor)
            - TU Certificate in Portuguese


            Thesis: *Zykloid: A Visual Approach to Drum Synthesis*  
            (grade 1.0)  

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
            Developed full-stack web and mobile apps, internal tools and dashboards for a wide range of clients.
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
            Developed interactive presentation software and tech demos for trade fair appearances.
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
            Developed a brand identity and designed online and print media for
            *objekt klein a*, a collectively run nightclub and cultural space. Many of
            the works are generative.
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

            - Designed, developed and shipped Nylon, a synthesizer plugin built around a novel geometric oscillator, covered by MusicRadar, Gearnews and Synth Anatomy
            - Planned, built and deployed cloud services to support Nylon's payment system and social features
            - Built a prototype for an AI-based audio plugin for a client from the film industry
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
            Built promotional tech demos with Unity:

            - An animated 3D avatar mirroring the live performance of a piano player wearing a motion-capture suit
            - A surfing mini-game using a real surfboard as a controller
        `,
        links: [
            {
                url: "https://ceti.one/",
                text: "ceti.one",
            },
        ],
        technology: {
            languages: ["C#"],
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
            where users would fly around as smiley avatars, listen to DJ sets, talk to each other
            and look at digital exhibitions. During the COVID-19 lockdowns the Virtual Club hosted
            14 events with up to 500 concurrent users and a diverse mix of DJs and artists,
            and received the *Applaus Award for Innovation* in 2022.
	`,
        technology: {
            languages: ["TypeScript", "Rust"],
            libraries: ["SolidJS", "BabylonJS", "WebRTC", "Axum"],
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
            Designed the Styleguide, merch and generative title animations for *Chaos Communication Congress*
            *37C3* and *38C3*, each with ~15,000 attendees, in collaboration with RoboKid.
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
        role: "Freelance Lead Engineer, acting CTO",
        institution: "Enerithm Technology GmbH",
        details: dedent`
            Technical lead for *Energuide*, an AI-based energy-efficiency platform at a seed-stage startup,
            leading a team of four engineers:

            - Took the product from concept to a live MVP with its first customers, among them large real-estate agencies
            - Owned system architecture, the chatbot, data pipeline, evaluation and testing, and continuous deployment
            - Designed the UI/UX and hired engineers to grow the team to meet demand
        `,
        links: [
            {
                url: "https://enerithm.com",
                text: "enerithm.com",
            },
        ],
        technology: {
            languages: ["Python", "TypeScript"],
            libraries: ["FastAPI", "Pydantic", "React"],
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
            Led an effort to modernize the stack and build new payment infrastructure for *pollinations.ai*,
            an open generative media API with 17k+ Discord members and 500+ apps built on it:

            - Port existing generation services to TypeScript
            - Add an auth proxy on Cloudflare Workers in front of the generation APIs, with auto-generated OpenAPI docs
            - Usage metering for text and image APIs with traces from request through billing
            - Batching cache to keep billing writes under the provider's 100 req/s limit, processing millions of events per day
            - Credits and invoicing via Polar.sh
        `,
        links: [
            { url: "https://pollinations.ai", text: "pollinations.ai" },
            { url: "https://myceli.ai", text: "myceli.ai" },
        ],
        technology: {
            languages: ["TypeScript"],
            libraries: ["Hono", "React", "TanStack"],
            services: ["Polar.sh", "Cloudflare"],
        },
        pinned: true,
    },
].reverse();
