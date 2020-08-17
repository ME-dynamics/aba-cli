import { spawn } from "child_process";

export async function installYarn() {
  const install = spawn("npm", ["install", "-g", "yarn"]);
  install.on("error", () => {
    throw new Error("npm is not installed!");
  });
  install.on("exit", () => {
    // console.log(errors);
    console.log(installed);
    // TODO: write these to file or db
  });
  let errors: string[] = [];
  for await (const output of install.stderr) {
    errors.push(output.toString());
  }
  let installed: string[] = [];
  for await (const output of install.stdout) {
    installed.push(output.toString());
  }
}

(async () => {
  await installYarn();
})();
