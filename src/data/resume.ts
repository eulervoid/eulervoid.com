import { dedent } from "~/util";

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
	technologies?: string[];
	link?: ResumeLink;
	pinned?: boolean;
}

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
		technologies: ["C++", "JUCE"],
	},
	{
		begin: "2011-02-01",
		end: "2011-08-31",
		role: "Software Engineer",
		institution: "a.s.t.i. GmbH",
		details: dedent`
			Developed full-stack web and mobile apps for iOS and Android.
		`,
		technologies: ["JavaScript", "Node.js", "Angular", "C++", "Qt5"],
	},
	{
		begin: "2013-02-01",
		end: "2014-02-28",
		role: "Student Assistant",
		institution: "Chair of Media Design, TU Dresden",
		details: dedent`
			Developed interactive presentation software for trade fair appearances.
		`,
		technologies: ["C++", "Cinder"],
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
		technologies: [
			"Adobe Illustrator",
			"Blender",
			"Python",
			"Processing",
			"Kotlin",
			"Rust",
		],
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
		technologies: [
			"C++",
			"JUCE",
			"FAUST",
			"Figma",
			"Node.js",
			"PostgreSQL",
			"AWS",
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
			Designed and built various dashboards and interactive visualizations of 
			blockchain infrastructure, using Elm and SVG.
		`,
		link: {
			url: "https://concordium.com",
			text: "concordium.com",
		},
		technologies: ["Elm", "JavaScript", "Figma"],
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
			- A live-animated avatar playing piano while wearing a mocap suit
			- Virtual surfing mini-game with a physical board as a controller
		`,
		link: {
			url: "https://ceti.one/",
			text: "ceti.one",
		},
		technologies: ["C#", "Unity", "Blender"],
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
		technologies: [
			"TypeScript",
			"SolidJS",
			"BabylonJS",
			"Rust",
			"WebRTC",
			"GRPC",
			"Blender",
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
			Designed and built interactive prototypes and websites for clients \
			in the plastics industry – from landing pages to minigames. \
		`,
		technologies: [
			"TypeScript",
			"React",
			"Astro",
			"SolidJS",
			"BabylonJS",
			"Figma",
		],
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
		technologies: ["Blender", "Affinity Designer", "Figma"],
		pinned: true,
	},
	{
		begin: "2024-01-01",
		end: "2025-03-30",
		type: "Freelance",
		role: "Freelance AI Developer",
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
		technologies: [
			"Python",
			"Pydantic",
			"FastAPI",
			"TypeScript",
			"React",
			"Figma",
			"PostgreSQL",
			"Hetzner",
			"Hashicorp Nomad",
		],
		pinned: true,
	},
].reverse();

export const pinnedResume = resume.filter((entry) => entry.pinned === true);
