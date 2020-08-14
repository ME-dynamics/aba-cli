import { Command, flags } from "@oclif/command";
import { cli } from "cli-ux";
import { join } from "path";
import {
  createDir,
  downloadTemplate,
  unzip,
  moveToParent,
  packageCommand,
  updatePackageJson,
  jsonDB,
} from "../utils";
export default class Create extends Command {
  static description = "creates node js clean architecture micro service";
  static examples = [`$ nca create yourServiceName`];

  // static flags = {
  //   help: flags.help({ char: "h" }),
  //   // flag with a value (-n, --name=VALUE)
  //   name: flags.string({ char: "n", description: "name to print" }),
  //   // flag with no value (-f, --force)
  //   force: flags.boolean({ char: "f" }),
  // };

  static args = [{ name: "serviceName" }];

  async run() {
    const { args, flags } = this.parse(Create);
    const { serviceName } = args;
    cli.action.start(`creating ${serviceName} service`);
    try {
      await createDir(serviceName);
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
        await unzip(file, serviceName);
      } catch (error) {
        cli.action.stop("something is wrong");
        this.error(error);
      }
    }
    cli.action.stop("file unzipped!");
    cli.action.start("some cleaning");
    try {
      await moveToParent(serviceName);
    } catch (error) {
      cli.action.stop("something is wrong");
      this.error(error);
    }
    await cli.wait(512);
    cli.action.stop("done");
    cli.action.start("updating package json");
    try {
      const rootPath = process.cwd();
      const path = join(rootPath, serviceName);
      await updatePackageJson(path, serviceName);
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
      const path = join(rootPath, serviceName);
      // const entityPath = join(path, 'packages', 'entities');
      process.chdir(path);
      await packageCommand({mode: "install", packageManager});
      const db = jsonDB();
      db.set.packageManager(packageManager);
      // process.chdir(entityPath);
      // await packageInstall(packageManager);
      // process.chdir(rootPath);
    } catch (error) {
      this.error(error.message);
    }
    cli.action.stop("installed");
  }
}
