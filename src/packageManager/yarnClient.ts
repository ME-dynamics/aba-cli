import typedi from "typed-install";
import execa from "execa";
import { terminateWithError } from '../utils';

async function install() {
  try {
    await execa("yarn", ["install"]);
  } catch (error) {
    terminateWithError(error, error.exitCode)
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
    await execa("yarn", ["remove", ...packageName]);
    
  } catch (error) {
    terminateWithError(error, error.exitCode)
  }
}

async function addDev(packageName: string[]) {
  try {
    await typedi(packageName, { packageManager: "yarn", dev: true });
  } catch (error) {
    terminateWithError(error, error.exitCode)
  }
}
export const yarnClient = {
  install,
  add,
  addDev,
  remove,
};
