import { spawn } from "bun";
import { lines } from "~/util";
import { mkdirSync, existsSync } from "node:fs";

async function convertToHls(inputPath: string, outputDir: string) {
	if (!existsSync(outputDir)) {
		mkdirSync(outputDir, { recursive: true });
	}

	console.log(
		lines(
			"Starting conversion:",
			`  Input: ${inputPath}`,
			`  Output: ${outputDir}/master.m3u8`,
		),
	);

	// biome-ignore format: custom formatting
	const ffmpegArgs = [
		"ffmpeg",
		"-i", inputPath,
		// video encoding settings (H.264)
		"-c:v", "libx264", "-preset", "fast", "-g", "48", "-sc_threshold", "0",
		// audio encoding settings (AAC)
		"-c:a", "aac", "-b:a", "128k", "-ac", "2",
		// 1080p stream (Index 0)
		"-map", "0:v", "-map", "0:a", "-s:v:0", "1920x1080", "-b:v:0", "5000k", "-maxrate:v:0", "5350k", "-bufsize:v:0", "7500k",
		// 720p stream (Index 1)
		"-map", "0:v", "-map", "0:a", "-s:v:1", "1280x720", "-b:v:1", "2800k", "-maxrate:v:1", "2996k", "-bufsize:v:1", "4200k",
		// 360p stream (Index 2)
		"-map", "0:v", "-map", "0:a", "-s:v:2", "640x360", "-b:v:2", "800k", "-maxrate:v:2", "856k", "-bufsize:v:2", "1200k",
		// hls packaging settings
		"-f", "hls",
		"-hls_time", "4",             
		"-hls_playlist_type", "vod",
		"-hls_flags", "independent_segments",
		"-master_pl_name", "master.m3u8",
		"-var_stream_map", "v:0,a:0 v:1,a:1 v:2,a:2", 
		`${outputDir}/stream_%v.m3u8` 
	];

	// 3. Execute process
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

// Get arguments from CLI: bun convert.ts <input_video> <output_folder>
const input = Bun.argv[2];
const output = Bun.argv[3] || "output_hls";

if (!input) {
	console.error(
		"Usage: bun run convert.ts <input_file.mkv> [output_directory]",
	);
	process.exit(1);
}

convertToHls(input, output);
