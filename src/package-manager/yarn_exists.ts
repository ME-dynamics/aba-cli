import execa from "execa";
import { gt } from "semver";
import { terminate_with_error } from "../utils";
export async function yarn_exists(): Promise<boolean | undefined> {
  try {
    const { stdout } = await execa("yarn", ["--version"]);
    if (stdout) {
      const validVersion = "1.22.0";
      if (gt(`${stdout}`, validVersion)) {
        return true;
      } else {
        terminate_with_error(
          `you should upgrade Yarn to version greater than 1.22.0
       current version : ${stdout}`,
          0
        );
      }
    } else {
      return false;
    }
  } catch (error) {
    terminate_with_error(error, error.exitCode);
  }
}
