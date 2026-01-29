import { spawn } from "bun";
import { lines } from "@src/util";
import { mkdirSync, existsSync } from "node:fs";

async function detectAudio(inputPath: string): Promise<boolean> {
    const proc = spawn({
        cmd: ["ffprobe", "-show_streams", "-select_streams", "a", inputPath],
        stdout: "pipe",
        stderr: "pipe",
    });

    const output = await new Response(proc.stdout).text();
    await proc.exited;

    return output.includes("Stream #");
}

async function convertToHls(inputPath: string, outputDir: string) {
    if (!existsSync(outputDir)) {
        mkdirSync(outputDir, { recursive: true });
    }

    const hasAudio = await detectAudio(inputPath);

    console.log(
        lines(
            "Starting conversion:",
            `  Input: ${inputPath}`,
            `  Has audio: ${hasAudio}`,
            `  Output: ${outputDir}/master.m3u8`,
        ),
    );

    // oxfmt-ignore
    const ffmpegArgs = [
        "ffmpeg",
        "-i", inputPath,

        // video encoding settings (H.264)
        "-c:v", "libx264",
        "-preset", "fast",
        "-g", "48",
        "-sc_threshold", "0",

        // audio encoding settings (AAC) - only if audio exists
        ...(hasAudio ? ["-c:a", "aac", "-b:a", "128k", "-ac", "2"] : []),

        // 1080p stream (Index 0)
        "-map", "0:v",
        ...(hasAudio ? ["-map", "0:a"] : []),
        "-vf:v:0", "crop=iw:iw*9/16,scale=1920:1080",
        "-b:v:0", "5000k",
        "-maxrate:v:0", "5350k",
        "-bufsize:v:0", "7500k",

        // 720p stream (Index 1)
        "-map", "0:v",
        ...(hasAudio ? ["-map", "0:a"] : []),
        "-vf:v:1", "crop=iw:iw*9/16,scale=1280:720",
        "-b:v:1", "2800k",
        "-maxrate:v:1", "2996k",
        "-bufsize:v:1", "4200k",

        // 360p stream (Index 2)
        "-map", "0:v",
        ...(hasAudio ? ["-map", "0:a"] : []),
        "-vf:v:2", "crop=iw:iw*9/16,scale=640:360",
        "-b:v:2", "800k",
        "-maxrate:v:2", "856k",
        "-bufsize:v:2", "1200k",

        // hls packaging settings
        "-f", "hls",
        "-hls_time", "4",
        "-hls_playlist_type", "vod",
        "-hls_flags", "independent_segments",
        "-master_pl_name", "master.m3u8",
        "-var_stream_map",
        hasAudio ? "v:0,a:0 v:1,a:1 v:2,a:2" : "v:0 v:1 v:2",
        `${outputDir}/stream_%v.m3u8`,
    ];

    const proc = spawn(ffmpegArgs, {
        stdout: "inherit",
        stderr: "inherit",
    });

    const exitCode = await proc.exited;

    if (exitCode === 0) {
        console.log("\nConversion successful!");
        console.log(`  Point HLS player to: ${outputDir}/master.m3u8`);
    } else {
        console.error(`\n  Error during conversion. Exit code: ${exitCode}`);
    }
}

const input = Bun.argv[2];
const output = Bun.argv[3] || "output_hls";

if (!input) {
    console.error("Usage: bun run convert.ts <input_video> [output_directory]");
    process.exit(1);
}

convertToHls(input, output);
