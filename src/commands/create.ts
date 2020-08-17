import { Command, flags } from "@oclif/command";
import { cli } from "cli-ux";
import { join } from "path";

import { db } from "../db";
import { createDir, moveTemplateFiles } from "../dir";
import { packageCommand, updatePackageJson } from "../packageManager";
import { downloadTemplate, unzip } from "../utils";

export default class Create extends Command {
  static description = "creates node js clean architecture micro service";
  static examples = [`$ aba create yourServiceName`];

  // static flags = {
  //   help: flags.help({ char: "h" }),
  //   // flag with a value (-n, --name=VALUE)
  //   name: flags.string({ char: "n", description: "name to print" }),
  //   // flag with no value (-f, --force)
  //   force: flags.boolean({ char: "f" }),
  // };

  static args = [
    {
      name: "mode",
      required: true,
      description: "choose what to create",
      hidden: false,
      options: [
        "service",
        "nodelib",
        "entity",
        "usecase",
        "controller",
        "interface",
        "adapters",
        "schema",
      ], // only allow input to be from a discrete set
    },
    {
      name: "packageName",
      required: true,
      description: "the package name you want to create",
      hidden: false,
    },
  ];

  async run() {
    const { args, flags } = this.parse(Create);
    const { mode, packageName } = args;
    if (mode === "service") {
      this.log('service'); // TODO: make separated actions 
      return;
    }
    cli.action.start(`creating ${packageName} service`);
    try {
      await createDir(packageName);
    } catch (error) {
      if (error.code === "EEXIST") {
        cli.action.stop("something is wrong");
        this.error("service already exist");
      }
    }
    await cli.wait(512);
    cli.action.stop("created");
    await cli.wait(512);
    cli.action.start("downloading node clean architecture template");
    let file: Buffer | undefined;
    try {
      file = await downloadTemplate();
    } catch (error) {
      cli.action.stop("something is wrong");
      this.error(error);
    }
    cli.action.stop("download completed");
    cli.action.start("unzipping file");
    await cli.wait(512);
    if (file) {
      try {
        await unzip(file, packageName);
      } catch (error) {
        cli.action.stop("something is wrong");
        this.error(error);
      }
    }
    cli.action.stop("file unzipped!");
    cli.action.start("some cleaning");
    try {
      await moveTemplateFiles(packageName);
    } catch (error) {
      cli.action.stop("something is wrong");
      this.error(error);
    }
    await cli.wait(512);
    cli.action.stop("done");
    cli.action.start("updating package json");
    try {
      const rootPath = process.cwd();
      const path = join(rootPath, packageName);
      await updatePackageJson(path, packageName);
    } catch (error) {
      cli.action.stop("something is wrong");
      this.error(error);
    }
    await cli.wait(512);
    cli.action.stop("package.json updated");
    cli.action.start("installing packages");
    const packageManager:
      | "yarn"
      | "npm" = await cli.prompt(
      "which package manager do you prefer? (yarn, npm)",
      { default: "yarn" }
    );
    try {
      const rootPath = process.cwd();
      const path = join(rootPath, packageName);
      // const entityPath = join(path, 'packages', 'entities');
      process.chdir(path);
      await packageCommand({ mode: "install" });
   
    } catch (error) {
      this.error(error.message);
    }
    cli.action.stop("installed");
  }
}
