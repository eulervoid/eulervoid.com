import { spawn } from "bun";
import { existsSync } from "node:fs";

async function deploy() {
    if (!existsSync("./dist")) {
        console.error("No dist folder found. Please run `bun run build` first.");
        process.exit(1);
    }

    console.log("\nDeploying to eulervoid.com...\n");

    // oxfmt-ignore
    const rcloneCmd = [
        "op", "run", "--",
        "rclone", "sync", "--progress", "--stats=1s",
        "./dist/client",
        "eulerweb:/public_html",
    ];

    const proc = spawn(rcloneCmd, {
        stdout: "inherit",
        stderr: "inherit",
        env: {
            ...process.env,
            RCLONE_CONFIG_EULERWEB_TYPE: "sftp",
            RCLONE_CONFIG_EULERWEB_HOST: "op://Personal/eulervoid.com/host",
            RCLONE_CONFIG_EULERWEB_USER: "op://Personal/eulervoid.com/username",
            RCLONE_CONFIG_EULERWEB_PASS: "op://Personal/eulervoid.com/password-rclone-obscured",
        },
    });

    const exitCode = await proc.exited;

    if (exitCode === 0) {
        console.log("\nDeployment complete!");
    } else {
        console.error(`\nDeployment failed with exit code ${exitCode}`);
        process.exit(1);
    }
}

await deploy();
