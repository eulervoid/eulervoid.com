import { Suspense } from "react";
import { DitheredMedia } from "./DitheredMedia";
import {
	Typewriter,
	Script,
	chain,
	deleteText,
	writeText,
	pause,
} from "./Typewriter";
import { Canvas } from "@react-three/fiber";
import { Pixelate } from "./Pixelate";
import { Preload } from "@react-three/drei";
import { SceneLoader } from "./SceneLoader";
import { WindowTopbar } from "./Window";

export function Hero() {
	const script: Script = chain(
		[
			pause(4),
			deleteText(),
			writeText("prototypes"),
			deleteText(),
			writeText("websites"),
			deleteText(),
			writeText("apps"),
			deleteText(),
			writeText("brands"),
			deleteText(),
			writeText("ai systems"),
			deleteText(7),
			writeText("agents"),
			deleteText(),
			writeText("solutions"),
		],
		{
			pauseAfterWrite: 4,
			pauseAfterDelete: 0.5,
		},
	);

	return (
		<div className="relative section flex flex-col justify-center h-[90vh] max-h-[680px] items-center md:items-start">
			<div className="absolute inset-0 w-full h-full">
				<Canvas orthographic>
					<Suspense fallback={<SceneLoader />}>
						<Pixelate pixelSize={2}>
							<DitheredMedia
								videoUrl="/videos/sand.mp4"
								imageUrl="/images/smileys.jpg"
								noiseUrl="/images/blue_noise/64_LDR_LLL1_8.png"
								brightness={1.0}
								contrast={0.5}
							/>
							<Preload all />
						</Pixelate>
					</Suspense>
				</Canvas>
			</div>
			<div className="max-w-110 z-1 bg-black border md:-ml-8">
				<WindowTopbar title="Greeting" showCloseButton={false} />
				<div className="space-y-2 px-5 md:px-8 py-7">
					<h1>Hello!</h1>
					<p>
						I’m Josh, a software engineer and creative technologist
						based in Berlin.
					</p>
					<p className="whitespace-pre-wrap">
						From first draft to execution, I can help you build{" "}
						<span className="text-lime-300">
							<Typewriter
								initialText={"solutions"}
								script={script}
								repeat={true}
							/>
						</span>{" "}
						that get you where you want to go.
					</p>
				</div>
			</div>
		</div>
	);
}
