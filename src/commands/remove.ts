import { Command } from "@oclif/command";
import { cli } from "cli-ux";
import { exec } from "child_process";
export default class Remove extends Command {
  static description = "remove package from your nca project";

  static args = [
    {
      name: "packageName",
      required: true,
      description:
        "name of npm module you want to remove from your nca project",
    },
  ];

  async run() {
    const { args } = this.parse(Remove);
    const { packageName } = args;
    const command = `yarn remove ${packageName}`;
    // TODO: remove types as well
    cli.action.start(`removing package ${packageName}`);
    try {
      exec(command, (error: any, stdout: any, stdin: any) => {
        if (error) this.log(error);
        this.log(stdout);
      });
    } catch (error) {
      cli.action.stop("remove failed");
      this.error(error);
    }
    cli.action.stop("done");
  }
}
