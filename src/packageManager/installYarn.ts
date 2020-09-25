import execa from "execa";
import { terminateWithError } from '../utils';

export async function installYarn() {
  try {
    const { stdout } = await execa("npm", ["install", "-g", "yarn"]);
    // TODO: layout out puts using blessed
    console.log(stdout);
  } catch (error) {
    terminateWithError(error, error.exitCode);
  }
}


