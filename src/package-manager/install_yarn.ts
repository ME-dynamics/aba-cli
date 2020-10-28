import execa from "execa";
import { terminate_with_error } from '../utils';

export async function install_yarn() {
  try {
    const { stdout } = await execa("npm", ["install", "-g", "yarn"]);
    // TODO: layout out puts using blessed
    console.log(stdout);
  } catch (error) {
    terminate_with_error(error, error.exitCode);
  }
}


