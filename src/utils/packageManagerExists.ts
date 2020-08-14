import { spawn } from "child_process";
import { gt } from "semver";
import { TPackageManager } from "./types";
export async function packageManagerExists(
  packageManager: TPackageManager
): Promise<boolean> {
  try {
    const pMExists = spawn(packageManager, ["--version"]);
    pMExists.on("error", () => {
      return false;
    });
    let pMVersion: string | undefined = undefined;
    for await (const data of pMExists.stdout) {
      const strData = data.toString();
      if (strData) {
        pMVersion = strData;
        break;
      }
    }
    if (pMVersion) {
      const validVersion = packageManager === "yarn" ? "1.16.0" : "6.0.0";
      if (gt(pMVersion, validVersion)) {
        return true;
      } else {
        throw Error(
          `you should update your ${packageManager} to latest version`
        );
      }
    } else {
      throw Error(`you don't have ${packageManager} installed on your machine`);
    }
  } catch (error) {
    throw error;
  }
}

