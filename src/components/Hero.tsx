import { Typewriter, Script } from "./Typewriter";

export function Hero() {
	const script: Script = [
		{ type: "Pause", seconds: 4 },
		{ type: "DeleteText", chars: 100, tick: 0.05 },
		{ type: "Pause", seconds: 0.5 },
		{ type: "TypeText", text: "prototypes" },
		{ type: "Pause", seconds: 4 },
		{ type: "DeleteText", chars: 100, tick: 0.05 },
		{ type: "Pause", seconds: 0.5 },
		{ type: "TypeText", text: "websites" },
		{ type: "Pause", seconds: 4 },
		{ type: "DeleteText", chars: 100, tick: 0.07 },
		{ type: "Pause", seconds: 0.5 },
		{ type: "TypeText", text: "apps" },
		{ type: "Pause", seconds: 4 },
		{ type: "DeleteText", chars: 100, tick: 0.07 },
		{ type: "Pause", seconds: 0.5 },
		{ type: "TypeText", text: "brands" },
		{ type: "Pause", seconds: 4 },
		{ type: "DeleteText", chars: 100, tick: 0.1 },
		{ type: "Pause", seconds: 0.5 },
		{ type: "TypeText", text: "solutions" },
	];
	return (
		<div className="section flex flex-col justify-center min-h-[80vh]">
			<div className="space-y-2 max-w-100">
				<h1>Hello!</h1>
				<p>
					I’m Josh, a software engineer and creative technologist based in
					Berlin.
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
	);
}
