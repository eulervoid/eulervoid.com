import { dedent } from "@src/util";

import nylon01 from "@assets/images/work/wave-casual/nylon-01.png?responsive-rgb";
import nylon02 from "@assets/images/work/wave-casual/nylon-02.png?responsive-rgb";
import nylon03 from "@assets/images/work/wave-casual/nylon-03.png?responsive-rgb";

import vclub01 from "@assets/images/work/virtual-club/vclub-01.png?responsive-rgb";
import vclub02 from "@assets/images/work/virtual-club/vclub-02.png?responsive-rgb";
import vclub03 from "@assets/images/work/virtual-club/vclub-outdoor-01.png?responsive-rgb";

import futur0101 from "@assets/images/work/futur01/futur01-01.jpg?responsive-rgb";
import futur0102 from "@assets/images/work/futur01/futur01-02.jpg?responsive-rgb";
import futur0103 from "@assets/images/work/futur01/futur01-03.jpg?responsive-rgb";

import ccc37 from "@assets/images/work/ccc/37c3-title.png?responsive-rgb";
import ccc38 from "@assets/images/work/ccc/38c3-title.png?responsive-rgb";

export type Media = {
    type: "image" | "video";
    url?: string;
    srcSet?: string;
    description: string;
    label?: string;
};

export type Link = {
    label: string;
    href: string;
};

export type WorkEntry = {
    title: string;
    description: string;
    client: string;
    begin: string;
    end: string | null;
    media: Media[];
    categories: string[];
    technology: TechnologyEntry;
    links: Link[];
    hide?: boolean;
};

export type TechnologyEntry = {
    languages?: string[];
    libraries?: string[];
    software?: string[];
    services?: string[];
};

const entries: WorkEntry[] = [
    {
        title: "Nylon",
        description: dedent`
            At Wave Casual we built Nylon, a new kind of software sythesizer 
            that generates sounds from geometric shapes. 
            
            It features two geometric oscillators which generate sound from cyclic bezier
            curves. The shape of these curves can be modulated via envelopes and LFOs to
            build rich and dynamic sounds in an intuitive way.
        `,
        client: "Wave Casual UG",
        begin: "2016-10-01",
        end: "2021-02-01",
        media: [
            {
                type: "image",
                srcSet: nylon01,
                description: "Nylon Screenshot",
                label: "nylon-01.png",
            },
            {
                type: "image",
                srcSet: nylon02,
                description: "Nylon Screenshot",
                label: "nylon-02.png",
            },
            {
                type: "image",
                srcSet: nylon03,
                description: "Nylon Screenshot",
                label: "nylon-03.png",
            },
        ],
        categories: ["Development", "UI/UX Design"],
        technology: {
            languages: ["C++", "Faust"],
            libraries: ["JUCE"],
            software: ["Blender", "Figma"],
        },
        links: [
            {
                label: "Nylon Introduction Video",
                href: "https://www.youtube.com/watch?v=zHkuSWSdI94",
            },
            {
                label: "github.com/eulervoid/nylon",
                href: "https://github.com/eulervoid/nylon",
            },
        ],
    },
    {
        title: "Virtual Club",
        description: dedent`
            The Virtual Club was a digital recreation of objekt klein a, where 
            users would fly around as smiley avatars, listen to DJ sets, talk to
            each other and look at digital exhibitions.

            During the Covid19 lockdowns, we hosted **14 virtual events** with up to **500 concurrent 
            visitors** and a diverse mix of international DJs and Artists. The project got awarded 
            the *Applaus Award for Innovation* in 2022.
        `,
        client: "objekt klein a e.V.",
        begin: "2020-12-01",
        end: "2022-12-01",
        media: [
            {
                type: "image",
                srcSet: vclub01,
                description: "Virtual Club Screenshot",
                label: "vclub-01.png",
            },
            {
                type: "image",
                srcSet: vclub02,
                description: "Virtual Club Screenshot",
                label: "vclub-02.png",
            },
            {
                type: "image",
                srcSet: vclub03,
                description: "Virtual Club Screenshot",
                label: "vclub-03.png",
            },
        ],
        categories: ["Development", "Art Direction", "3D Modeling"],
        technology: {
            languages: ["TypeScript", "Rust"],
            libraries: ["SolidJS", "BabylonJS", "WebRTC", "Axum"],
            software: ["Figma", "Blender", "Meshroom"],
        },
        links: [
            {
                label: "Applaus Award Video",
                href: "https://www.youtube.com/watch?v=oKXnjmGDuNo",
            },
        ],
    },
    {
        title: "Futur01",
        description: dedent`
            A virtual exhibition and 3D web experience accompanying a 
            space-filling installation at Hole of Fame, Dresden, by Alba Álvarez.
        `,
        client: "Alba Álvarez",
        begin: "2021-09-01",
        end: "2021-12-15",
        media: [
            {
                type: "image",
                srcSet: futur0101,
                description: "Futur01 Screenshot 1",
                label: "futur-01.jpg",
            },
            {
                type: "image",
                srcSet: futur0102,
                description: "Futur01 Screenshot 2",
                label: "futur-02.jpg",
            },
            {
                type: "image",
                srcSet: futur0103,
                description: "Futur01 Screenshot 3",
                label: "futur-03.jpg",
            },
        ],
        categories: ["Development", "Art Direction"],
        technology: {
            languages: ["TypeScript"],
            libraries: ["SolidJS", "BabylonJS"],
            software: ["Blender"],
        },
        links: [
            {
                label: "futur01.com",
                href: "https://www.futur01.com",
            },
            {
                label: "Project Info",
                href: "https://www.albatata.com/project/futur_01_,-2022",
            },
        ],
    },
    {
        title: "Chaos Communication Congress",
        description: dedent`
            In 2023 and 2024 I had the honor to design the visual identity of the 
            annual Chaos Communication Congress in Hamburg, Germany, 
            together with Luis Masalliera ([@robokid](https://instagram.com/robokid)). 
        `,
        client: "Chaos Computer Club",
        begin: "2023-06",
        end: "2024-06",
        media: [
            {
                type: "image",
                srcSet: ccc37,
                description: "37C3 Title Screen",
                label: "37c3-title.png",
            },
            {
                type: "image",
                srcSet: ccc38,
                description: "38C3 Title Screen",
                label: "38c3-title.png",
            },
        ],
        categories: ["Design", "Development"],
        technology: {
            languages: ["Rust", "Python"],
            libraries: ["bpy", "ffmpeg"],
            software: ["Blender", "Figma", "Affinity"],
        },
        links: [
            {
                label: "37C3 Styleguide",
                href: "https://events.ccc.de/congress/2023/infos/styleguide/styleguide.pdf",
            },
            {
                label: "38C3 Styleguide",
                href: "https://events.ccc.de/congress/2024/infos/styleguide/38c3-styleguide-v2.pdf",
            },
        ],
    },
] as const;

export const work = entries
    .filter((entry) => !entry.hide)
    .sort((a, b) => b.begin.localeCompare(a.begin));
