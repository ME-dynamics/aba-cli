import typedi from "typed-install";
import execa from "execa";

async function install() {
  try {
    const { stdout } = await execa("yarn", ["install"]);
  } catch (error) {
    console.error(error);
    process.exit(error.exitCode);
  }
}

async function add(packageName: string[]) {
  try {
    await typedi(packageName, { packageManager: "yarn" });
  } catch (error) {
    console.error(error);
    process.exit(error.exitCode);
  }
}

async function remove(packageName: string[]) {
  try {
    const { stdout } = await execa("yarn", ["remove", ...packageName]);
    console.log(stdout);
  } catch (error) {
    console.error(error);
    process.exit(error.exitCode);
  }
}

async function addDev(packageName: string[]) {
  try {
    await typedi(packageName, { packageManager: "yarn", dev: true });
  } catch (error) {
    console.error(error);
    process.exit(error.exitCode);
  }
}
export const yarnClient = {
  install,
  add,
  addDev,
  remove,
};
