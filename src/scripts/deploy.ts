import { spawn } from "node:child_process";
import { existsSync } from "node:fs";

async function deploy() {
    if (!existsSync("./dist")) {
        console.error("No dist folder found. Please run `deno task build` first.");
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

    const proc = spawn(rcloneCmd[0], rcloneCmd.slice(1), {
        stdio: "inherit",
        env: {
            ...process.env,
            RCLONE_CONFIG_EULERWEB_TYPE: "sftp",
            RCLONE_CONFIG_EULERWEB_HOST: "op://Personal/eulervoid.com/host",
            RCLONE_CONFIG_EULERWEB_USER: "op://Personal/eulervoid.com/username",
            RCLONE_CONFIG_EULERWEB_PASS: "op://Personal/eulervoid.com/password-rclone-obscured",
        },
    });

    const exitCode = await new Promise<number>((resolve, reject) => {
        proc.once("error", reject);
        proc.once("close", (code) => resolve(code ?? 1));
    });

    if (exitCode === 0) {
        console.log("\nDeployment complete!");
    } else {
        console.error(`\nDeployment failed with exit code ${exitCode}`);
        process.exit(1);
    }
}

await deploy();
