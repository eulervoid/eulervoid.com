import { lazy, Suspense } from "react";
import { Typewriter, Script, chain, deleteText, writeText, pause } from "./Typewriter";
import { WindowTopbar } from "./Window";
import { twMerge } from "tailwind-merge";

const HeroVideoWebGL = lazy(() => import("./HeroVideoWebGL"));

export function Hero() {
    const script: Script = chain(
        [
            pause(4),
            deleteText(),
            writeText("ai systems"),
            deleteText(7),
            writeText("agents"),
            deleteText(),
            writeText("apps"),
            deleteText(),
            writeText("websites"),
            deleteText(),
            writeText("prototypes"),
        ],
        {
            pauseAfterWrite: 4,
            pauseAfterDelete: 0.5,
        },
    );

    return (
        <div
            className={twMerge(
                "relative section",
                "flex flex-col justify-center items-center md:items-start",
                "min-h-[min(70vh,600px)]",
            )}
        >
            <div className="absolute inset-0 w-full h-full">
                <Suspense>
                    <HeroVideoWebGL
                        videoUrl="/videos/hero/master.m3u8"
                        noiseUrl="/images/blue_noise/64_LDR_LLL1_8.png"
                        brightness={1.8}
                        contrast={0.8}
                    />
                </Suspense>
            </div>
            <div className="max-w-110 z-1 bg-black border md:-ml-8">
                <WindowTopbar title="Greeting" showCloseButton={false} />
                <div className="space-y-2 px-5 md:px-8 py-7">
                    <h1>Hello!</h1>
                    <p>I’m Josh, a software engineer and creative technologist based in Berlin.</p>
                    <p className="whitespace-pre-wrap">
                        From first draft to execution, I can help you build{" "}
                        <span className="text-lime-300">
                            <Typewriter initialText={"solutions"} script={script} repeat={true} />
                        </span>{" "}
                        that get you where you want to go.
                    </p>
                </div>
            </div>
        </div>
    );
}
