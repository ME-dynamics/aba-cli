import typedi from "typed-install";
import execa from "execa";
import { terminate_with_error } from '../utils';

async function install() {
  try {
    await execa("yarn", ["install"]);
  } catch (error) {
    terminate_with_error(error, error.exitCode)
  }
}

async function add(package_name: string[]) {
  try {
    await typedi(package_name, { packageManager: "yarn" });
  } catch (error) {
    terminate_with_error(error, error.exitCode);
  }
}

async function remove(package_name: string[]) {
  try {
    await execa("yarn", ["remove", ...package_name]);
    
  } catch (error) {
    terminate_with_error(error, error.exitCode)
  }
}

async function add_dev(package_name: string[]) {
  try {
    await typedi(package_name, { packageManager: "yarn", dev: true });
  } catch (error) {
    terminate_with_error(error, error.exitCode)
  }
}
export const yarn_client = {
  install,
  add,
  add_dev,
  remove,
};
