import { $ } from "bun";
import { existsSync } from "node:fs";

async function deploy() {
    if (!existsSync("./dist")) {
        console.error("No dist folder found. Please run `bun run build` first.");
    }

    const [host, user, pass] = await Promise.all([
        $`op read "op://Personal/eulervoid.com/host"`.text(),
        $`op read "op://Personal/eulervoid.com/username"`.text(),
        $`op read "op://Personal/eulervoid.com/password-rclone-obscured"`.text(),
    ]).then((values) => values.map((v) => v.trim()));

    console.log(`Deploying to ${host}`);

    const connectionString = `:sftp,host="${host}",user="${user}",pass="${pass}"`;
    await $`rclone sync --progress ./dist/client ${connectionString}:/public_html`;
}

await deploy();
