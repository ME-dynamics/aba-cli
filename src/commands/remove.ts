import { Command } from "@oclif/command";
import ora from "ora";
import { packageInfo } from "../packageManager";
import { isValidDirectory } from "../dir";
import { yarnClient } from "../packageManager";
import { terminateWithError } from "../utils";
export default class Remove extends Command {
  static description = "remove package from your nca project";
  static examples = [`$ aba remove packageName`];
  static strict = false;
  static args = [
    {
      name: "packageName",
      required: true,
      description:
        "name of npm module you want to remove from your nca / nodelib / rrn project",
    },
  ];

  async run() {
    // TODO: move to command actions 
    const { argv } = this.parse(Remove);
    const dirInfo = isValidDirectory();
    const spinner = ora("removing package").start();
    if (!dirInfo.validDir) {
      spinner.fail("not a valid nca, nodelib, rrn project");
      process.exit();
    }
    try {
      await packageInfo({ argv, dev: false, layer: "global", mode: "remove" });
      await yarnClient.remove(argv);
      spinner.succeed("removed");
    } catch (error) {
      spinner.fail("failed to remove packages");
      terminateWithError(error, error.exitCode);
    }
  }
}
