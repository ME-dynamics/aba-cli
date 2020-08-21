import { spawn } from "child_process";
import { yarnExists } from "./yarnExists";
import { IPackageMode } from "../types";
function getParams(args: IPackageMode): string[] {
  const { mode, packageName } = args;
  if (mode !== "install" && !packageName)
    throw new Error("should define package name");

  if (mode === "remove" && packageName) {
    return ["remove", packageName];
  }
  if (mode === "install") return ["install"];

  if (mode === "addPackage" && packageName) {
    return ["add", packageName];
  } else {
    throw new Error(`invalid mode: ${mode}`);
  }
}

export async function packageCommand(args: IPackageMode) {
  const yarnCheck = await yarnExists();
  
  if (yarnCheck) {
    const params = getParams(args);

    const installModules = spawn("yarn", params);
    for await (const data of installModules.stdout) {
      // nothing to do here for now
      // TODO: use the data to make assumptions
    }
  }
}
