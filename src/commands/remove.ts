import { Command } from "@oclif/command";
import ora from "ora";
import { package_info, yarn_client } from "../package-manager";
import { is_valid_directory } from "../dir";
import { terminate_with_error } from "../utils";
export default class Remove extends Command {
  static description = "remove package from your nca project";
  static examples = [`$ aba remove package_name`];
  static strict = false;
  static args = [
    {
      name: "package_name",
      required: true,
      description:
        "name of npm module you want to remove from your nca / nodelib / rrn project",
    },
  ];

  async run() {
    // TODO: move to command actions 
    const { argv } = this.parse(Remove);
    const dirInfo = is_valid_directory();
    const spinner = ora("removing package").start();
    if (!dirInfo.valid_dir) {
      spinner.fail("not a valid nca, nodelib, rrn project");
      process.exit();
    }
    try {
      await package_info({ argv, dev: false, layer: "global", mode: "remove" });
      await yarn_client.remove(argv);
      spinner.succeed("removed");
    } catch (error) {
      spinner.fail("failed to remove packages");
      terminate_with_error(error, error.exitCode);
    }
  }
}
