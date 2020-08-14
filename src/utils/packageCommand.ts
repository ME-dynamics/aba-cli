import { spawn } from "child_process";
import { packageManagerExists } from "./packageManagerExists";
import { IParams, TPackageManager } from "./types";
function getParams(args: IParams): string[] {
  const { mode, packageManager, packageName } = args;
  if (mode !== "install" && !packageName) throw new Error("should define package name");

  if (mode === "remove" && packageName) {
    const params =
      packageManager === "npm"
        ? ["uninstall", packageName]
        : ["remove", packageName];
    return params;
  } 
  if (mode === "install") return ["install"];
  
  if (mode === "addPackage" && packageName) {
    const params =
      packageManager === "npm"
        ? ["install", packageName, "--save"]
        : ["add", packageName];
    return params;
  } else {
    throw new Error(`invalid mode: ${mode}`);
  }
}

export async function packageCommand(args: IParams) {
  const { packageManager } = args;
  let pMExists: boolean;
  try {
    pMExists = await packageManagerExists(packageManager);
  } catch (error) {
    throw error;
  }
  if (pMExists) {
    const params = getParams(args);

    const installModules = spawn(packageManager, params);
    for await (const data of installModules.stdout) {
      // nothing to do here for now
      // TODO: use the data to make assumptions
    }
  }
}
