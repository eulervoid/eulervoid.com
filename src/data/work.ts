import { dedent } from "~/util";

type Media = {
	type: "image" | "video";
	url: string;
	description: string;
};

type WorkEntry = {
	title: string;
	description: string;
	media: Media[];
	categories: string[];
	technology: TechnologyEntry;
};

type TechnologyEntry = {
	languages?: string[];
	libraries?: string[];
	software?: string[];
};

export const work: WorkEntry[] = [
	{
		title: "Wave Casual",
		description: dedent`
			Synth
		`,
		media: [],
		categories: ["Development", "UI/UX Design"],
		technology: {
			languages: ["C++", "Faust"],
			libraries: ["JUCE"],
			software: ["Blender", "Figma"],
		},
	},
	{
		title: "Virtual Club",
		description: dedent`
			The Virtual Club was a digital recreation of objekt klein a, where 
			users would fly around as smiley avatars, listen to DJ sets, talk to
			each other and look at digital exhibitions.
		`,
		media: [],
		categories: ["Development", "Art Direction"],
		technology: {
			languages: ["Rust", "TypeScript"],
			libraries: ["SolidJS", "BabylonJS"],
			software: ["Figma", "Blender", "Meshroom"],
		},
	},
	{
		title: "Futur01",
		description: dedent`
			A virtual exhibition, 3D web experience.
		`,
		media: [
			{
				type: "image",
				url: "/images/work/futur01/futur01-01.jpg",
				description: "",
			},
		],
		categories: ["Development", "Art Direction"],
		technology: {
			languages: ["TypeScript"],
			libraries: ["SolidJS", "BabylonJS"],
			software: ["Blender"],
		},
	},
	{
		title: "Chaos Communication Congress",
		description: dedent`
			In 2023 and 2024 I had the honor to design the visual identity of the 
			annual Chaos Communication Congress (37C3/38C3), together with Luis Masalliera ((robokid)[https://robokid.com])
		`,
		media: [],
		categories: ["Development", "Art Direction"],
		technology: {
			software: ["Blender", "Figma", "Affinity Designer"],
		},
	},
	{
		title: "Energuide",
		description: dedent`
			Working with Enerithm Technology GmbH, I led an early stage development team 
			building *Energuide*, an AI driven energy efficiency platform. 
		`,
		media: [],
		categories: ["UI/UX Design", "Development", "DevOps"],
		technology: {
			languages: ["TypeScript", "Python"],
			libraries: [
				"FastAPI",
				"Pydantic",
				"PydanticAI",
				"Instructor",
				"React",
				"TanStack Query",
			],
			software: ["Figma"],
		},
	},
] as const;
