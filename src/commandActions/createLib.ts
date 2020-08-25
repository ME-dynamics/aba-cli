import { cli } from "cli-ux";

import { ICreateLib } from "../types";
import { createDir, moveTemplateFiles } from "../dir";
import { downloadTemplate, unzip } from "../utils";
import { updatePackageJson, packageCommand } from "../packageManager";
import { join } from "path";

export async function createLib(args: ICreateLib) {
  const { error, log, name, mode } = args;
  cli.action.start(`creating ${name} ${mode}`);
  try {
    await createDir(name);
  } catch (err) {
    if (err.code === "EEXIST") {
      cli.action.stop("something is wrong");
      error({ err: "service already exist" });
    }
  }
  cli.action.stop("created");
  const libTitle =
    mode === "service"
      ? "node clean architecture"
      : mode === "nodelib"
      ? "node library"
      : "react & react native";
  cli.action.start(`downloading ${libTitle} template`);
  let file: Buffer | undefined;
  try {
    file = await downloadTemplate(mode);
  } catch (err) {
    cli.action.stop("something is wrong");
    error({err});
  }
  cli.action.stop("download completed");
  cli.action.start("unzipping file");

  if (file) {
    try {
      await unzip(file, name);
    } catch (err) {
      cli.action.stop("something is wrong");
      error({err});
    }
  }
  cli.action.stop("file unzipped!");
  cli.action.start("some cleaning");
  try {
    await moveTemplateFiles(name);
  } catch (err) {
    cli.action.stop("something is wrong");
    error({err});
  }
  cli.action.stop("done");
  cli.action.start("updating package json");
  try {
    await updatePackageJson(name, libTitle);
  } catch (err) {
    cli.action.stop("something is wrong");
    error({err});
  }
  cli.action.stop("package.json updated");
  cli.action.start("installing packages");
  try {
    const rootPath = process.cwd();
    const path = join(rootPath, name);
    process.chdir(path);
    await packageCommand({ mode: "install" });
  } catch (err) {
    error({err});
  }
  cli.action.stop("installed");
}
