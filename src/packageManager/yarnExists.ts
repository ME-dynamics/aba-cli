import execa from "execa";
import { gt } from "semver";
import { terminateWithError } from "../utils";
export async function yarnExists(): Promise<boolean | undefined> {
  try {
    const { stdout } = await execa("yarn", ["--version"]);
    if (stdout) {
      const validVersion = "1.22.0";
      if (gt(`${stdout}`, validVersion)) {
        return true;
      } else {
        terminateWithError(
          `you should upgrade Yarn to version greater than 1.22.0
       current version : ${stdout}`,
          0
        );
      }
    } else {
      return false;
    }
  } catch (error) {
    terminateWithError(error, error.exitCode);
  }
}
