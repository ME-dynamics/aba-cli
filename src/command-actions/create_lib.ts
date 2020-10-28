import ora from "ora";
import { i_create_lib, t_libraries } from "../types";
import { create_dir, move_template_files } from "../dir";
import {
  download_template,
  unzip,
  terminate_with_error,
  figlet,
} from "../utils";
import { update_package_json, yarn_client } from "../package-manager";
import { join } from "path";
import { ErrorFactory } from "aba-utils";

async function create_lib_directory(name: string) {
  try {
    await create_dir(name);
  } catch (error) {
    throw new ErrorFactory({
      name: "fsError",
      message: `unable to create ${name} directory`,
      detail: "",
      path: `current directory ${process.cwd()}`,
      nativeError: error,
      timestamp: undefined,
    });
  }
}

async function downloading_template(
  mode: t_libraries,
  lib_title: string
): Promise<Buffer | undefined> {
  try {
    const file = await download_template(mode);
    if (file) {
      return file;
    } else {
      throw new ErrorFactory({
        name: "IOError",
        message: `unable to download ${lib_title} from github`,
        detail: "",
        path: `current directory ${process.cwd()}`,
        nativeError: undefined,
        timestamp: undefined,
      });
    }
  } catch (error) {
    throw new ErrorFactory({
      name: "IOError",
      message: `unable to download ${lib_title} from github`,
      detail: "",
      path: `current directory ${process.cwd()}`,
      nativeError: error,
      timestamp: undefined,
    });
  }
}

async function unzip_template(template_file: Buffer, name: string) {
  try {
    await unzip(template_file, name);
  } catch (error) {
    throw new ErrorFactory({
      name: "fsError",
      message: `unable to unzip template file`,
      detail: "",
      path: `current directory ${process.cwd()}`,
      nativeError: error,
      timestamp: undefined,
    });
  }
}

async function move_master_branch_to_root(name: string, mode: t_libraries) {
  try {
    await move_template_files(name, mode);
  } catch (error) {
    throw new ErrorFactory({
      name: "fsError",
      message: `unable to move template files`,
      detail: "",
      path: `current directory ${process.cwd()}`,
      nativeError: error,
      timestamp: undefined,
    });
  }
}

async function update_package_info(name: string, lib_title: string) {
  try {
    await update_package_json(name, lib_title);
  } catch (error) {
    throw new ErrorFactory({
      name: "fsError",
      message: `unable to update package json file`,
      detail: "",
      path: `current directory ${process.cwd()}`,
      nativeError: error,
      timestamp: undefined,
    });
  }
}

async function install_packages(name: string) {
  try {
    const root_path = process.cwd();
    const path = join(root_path, name);
    process.chdir(path);
    await yarn_client.install();
  } catch (error) {
    throw new ErrorFactory({
      name: "yarnError",
      message: `unable to install node modules`,
      detail: "",
      path: `current directory ${process.cwd()}`,
      nativeError: error,
      timestamp: undefined,
    });
  }
}

export async function create_lib(args: i_create_lib) {
  figlet();
  const { name, mode } = args;
  const lib_title =
    mode === "service"
      ? "node clean architecture"
      : mode === "nodelib"
      ? "node library"
      : "react & react native";
  const dir_spinner = ora(`creating ${name} directory`).start();
  try {
    await create_lib_directory(name);
  } catch (error) {
    dir_spinner.fail("creating directory failed");
    terminate_with_error(error, error.exitCode);
  }
  dir_spinner.succeed("directory created");
  let file: Buffer | undefined;
  const download_spinner = ora("downloading template").start();
  try {
    file = await downloading_template(mode, lib_title);
    if (!file) {
      download_spinner.fail("failed to download template");
      terminate_with_error("no downloaded file", 0);
    }
  } catch (error) {
    download_spinner.fail("failed to download template");
    terminate_with_error(error, error.exitCode);
  }
  download_spinner.succeed("template downloaded");
  const unzip_spinner = ora("unzipping template file").start();
  try {
    file && (await unzip_template(file, name));
  } catch (error) {
    unzip_spinner.fail("failed to unzip template file");
    terminate_with_error(error, error.exitCode);
  }
  unzip_spinner.succeed("template file extracting complete");
  const clean_up_spinner = ora("cleaning up");
  try {
    await move_master_branch_to_root(name, mode);
  } catch (error) {
    clean_up_spinner.fail("failed to clean up");
    terminate_with_error(error, error.exitCode);
  }
  clean_up_spinner.succeed("cleaned up");
  const update_info_spinner = ora("updating package json").info();
  try {
    await update_package_info(name, lib_title);
  } catch (error) {
    update_info_spinner.fail("failed to update package info");
    terminate_with_error(error, error.exitCode);
  }
  update_info_spinner.succeed("package json updated");
  const install_spinner = ora("install node modules").start();
  try {
    await install_packages(name);
  } catch (error) {
    install_spinner.fail("failed to install packages");
    terminate_with_error(error, error.exitCode);
  }
  install_spinner.succeed("node modules installed");
}
