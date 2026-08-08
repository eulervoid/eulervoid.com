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
            Developed full-stack web and mobile apps, internal tools and dashboards for wide range of clients. 
        `,
        technology: {
            langages: ["JavaScript", "C++"],
            libraries: ["Sails.js", "Angular", "Cordoba", "Qt5"],
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
            objekt klein a, a collectively run nightclub and cultural space. Many of
            the works are generative.
        `,
        link: {
            url: "https://objektkleina.com",
            text: "objektkleina.com",
        },
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
            Lead the development of multiple projects:
            - Designed, developed and shipped the Nylon synthesizer-plugin
            - Planned, built and deployed cloud services to support Nylons payment system and social features
            - Built a prototype for an AI-based audio-plugin for a client from the film industry
            - Designed and developed the UI for a smart loudness meter
        `,
        technology: {
            languages: ["C++", "FAUST", "TypeScript"],
            libraries: ["JUCE", "Koa.js"],
            software: ["Figma", "PostgreSQL"],
            services: ["AWS", "DigitalOcean"],
        },
        pinned: true,
    },
    {
        begin: "2019-06-01",
        end: "2021-12-01",
        type: "Freelance",
        role: "Freelance Software Engineer",
        institution: "Concordium AG",
        details: dedent`
            Designed and built various dashboards and interactive visualizations of 
            blockchain infrastructure, using Elm and SVG.
        `,
        link: {
            url: "https://concordium.com",
            text: "concordium.com",
        },
        technology: {
            languages: ["Elm", "TypeScript"],
            software: ["Figma"],
        },
        pinned: true,
    },
    {
        begin: "2021-02-01",
        end: "2021-10-01",
        type: "Freelance",
        role: "Freelance Software Engineer",
        institution: "Center for Tactile Internet, TU Dresden",
        details: dedent`
            Helped create promotional tech-demos with Unity:
            - An animated avatar mirroring the live performance of a piano player wearing a mocap suit
            - A surfing mini-game using a real surfboard as a controller
        `,
        link: {
            url: "https://ceti.one/",
            text: "ceti.one",
        },
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
            Designed and developed a multiplayer 3D web experience, for hosting virtual events.
            At one of the 12 events throughout the year, guests could see DJs play and meet each
            other in a virtual replica of *objekt klein a*, a cultural space in Dresden, Germany.
	`,
        technology: {
            langages: ["TypeScript", "Rust"],
            libraries: ["SolidJS", "BabylonJS", "WebRTC", "Axum"],
            software: ["Figma", "Blender", "Meshroom"],
        },
        pinned: true,
    },
    {
        begin: "2021-12-01",
        end: "2023-10-01",
        type: "Freelance",
        role: "Freelance Software Engineer",
        institution: "HolyPoly GmbH",
        details: dedent`
            Designed and built interactive prototypes and websites for clients \
            in the plastics industry – from landing pages to minigames. \
        `,
        technology: {
            languages: ["TypeScript"],
            libraries: ["React", "Astro", "SolidJS", "BabylonJS"],
            software: ["Figma"],
        },
        pinned: true,
    },
    {
        begin: "2023-08-01",
        end: "2025-01-01",
        type: "Freelance",
        role: "Freelance Designer",
        institution: "Chaos Computer Club",
        details: dedent`
            Designed the style guide, merch and title animations for Chaos Communication Congress \
            in 2023 and 2024 (37C3 and 38C3), in collaboration with RoboKid.
        `,
        technology: {
            languages: ["Rust", "Python"],
            libraries: ["bpy", "ffmpeg"],
            software: ["Blender", "Figma", "Affinity"],
        },
        pinned: true,
    },
    {
        begin: "2024-01-01",
        end: "2025-03-30",
        type: "Freelance",
        role: "Freelance Software Engineer",
        institution: "Enerithm Technology GmbH",
        details: dedent`
            Led the early stage development team building *Energuide* an AI based energy efficiency platform. 
            - UI/UX design
            - System architecture
            - AI development, evaluation and testing
            - Continuous Deployment
        `,
        link: {
            url: "https://enerithm.com",
            text: "enerithm.com",
        },
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
            Built payment infrastructure for pollinations.ai, a community focused AI platform:
            - A new authentication system based on Cloudflare Workers, using Hono and BetterAuth, acting as an authenticating proxy
            - Precise usage based spend tracking for text and image generation
            - Credit and billing system integrating Polar.sh
        `,
        link: {
            url: "https://pollinations.ai",
            text: "pollinations.ai",
        },
        technology: {
            languages: ["TypeScript"],
            libraries: ["Hono", "React", "TanStack"],
            services: ["Polar.sh", "Cloudflare"],
        },
        pinned: true,
    },
].reverse();
