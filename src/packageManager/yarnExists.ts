import { spawn } from "child_process";
import { gt } from "semver";
export async function yarnExists(): Promise<boolean> {
  try {
    const yarnExists = spawn("yarn", ["--version"]);
    yarnExists.on("error", () => {
      return false;
    });
    let yarnVersion: string | undefined = undefined;
    for await (const data of yarnExists.stdout) {
      const strData = data.toString();
      if (strData) {
        yarnVersion = strData;
        break;
      }
    }
    if (yarnVersion) {
      const validVersion = "1.22.0";
      if (gt(yarnVersion, validVersion)) {
        return true;
      } else {
        throw Error(
          `you should update yarn to latest version`
        );
      }
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
}