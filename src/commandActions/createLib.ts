import ora from "ora";
import { ICreateLib, TLibraries } from "../types";
import { createDir, moveTemplateFiles } from "../dir";
import { downloadTemplate, unzip, terminateWithError, figlet } from "../utils";
import { updatePackageJson, yarnClient } from "../packageManager";
import { join } from "path";
import { ErrorFactory } from "aba-utils";

async function createLibDirectory(name: string) {
  try {
    await createDir(name);
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

async function downloadingTemplate(
  mode: TLibraries,
  libTitle: string
): Promise<Buffer | undefined> {
  try {
    const file = await downloadTemplate(mode);
    if (file) {
      return file;
    } else {
      throw new ErrorFactory({
        name: "IOError",
        message: `unable to download ${libTitle} from github`,
        detail: "",
        path: `current directory ${process.cwd()}`,
        nativeError: undefined,
        timestamp: undefined,
      });
    }
  } catch (error) {
    throw new ErrorFactory({
      name: "IOError",
      message: `unable to download ${libTitle} from github`,
      detail: "",
      path: `current directory ${process.cwd()}`,
      nativeError: error,
      timestamp: undefined,
    });
  }
}

async function unzipTemplate(templateFile: Buffer, name: string) {
  try {
    await unzip(templateFile, name);
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

async function moveMasterBranchToRoot(name: string, mode: TLibraries) {
  try {
    await moveTemplateFiles(name, mode);
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

async function updatePackageInfo(name: string, libTitle: string) {
  try {
    await updatePackageJson(name, libTitle);
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

async function installPackages(name: string) {
  try {
    const rootPath = process.cwd();
    const path = join(rootPath, name);
    process.chdir(path);
    await yarnClient.install();
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

export async function createLib(args: ICreateLib) {
  figlet();
  const { name, mode } = args;
  const libTitle =
    mode === "service"
      ? "node clean architecture"
      : mode === "nodelib"
      ? "node library"
      : "react & react native";
  const dirSpinner = ora(`creating ${name} directory`).start();
  try {
    await createLibDirectory(name);
  } catch (error) {
    dirSpinner.fail("creating directory failed");
    terminateWithError(error, error.exitCode);
  }
  dirSpinner.succeed("directory created");
  let file: Buffer | undefined;
  const downloadSpinner = ora("downloading template").start();
  try {
    file = await downloadingTemplate(mode, libTitle);
    if (!file) {
      downloadSpinner.fail("failed to download template");
      terminateWithError("no downloaded file", 0);
    }
  } catch (error) {
    downloadSpinner.fail("failed to download template");
    terminateWithError(error, error.exitCode);
  }
  downloadSpinner.succeed("template downloaded");
  const unzipSpinner = ora("unzipping template file").start();
  try {
    file && (await unzipTemplate(file, name));
  } catch (error) {
    unzipSpinner.fail("failed to unzip template file");
    terminateWithError(error, error.exitCode);
  }
  unzipSpinner.succeed("template file extracting complete");
  const cleanUpSpinner = ora("cleaning up");
  try {
    await moveMasterBranchToRoot(name, mode);
  } catch (error) {
    cleanUpSpinner.fail("failed to clean up");
    terminateWithError(error, error.exitCode);
  }
  cleanUpSpinner.succeed("cleaned up");
  const updateInfoSpinner = ora("updating package json").info();
  try {
    await updatePackageInfo(name, libTitle);
  } catch (error) {
    updateInfoSpinner.fail("failed to update package info");
    terminateWithError(error, error.exitCode);
  }
  updateInfoSpinner.succeed("package json updated");
  const installSpinner = ora("install node modules").start();
  try {
    await installPackages(name);
  } catch (error) {
    installSpinner.fail("failed to install packages");
    terminateWithError(error, error.exitCode);
  }
  installSpinner.succeed("node modules installed");
}
