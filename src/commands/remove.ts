import {Command } from '@oclif/command'
import { cli } from 'cli-ux';
import { exec } from 'child_process'
export default class Remove extends Command {
  static description = 'remove package from nca'

  static args = [
    {
      name: "packageName",
      required: true,
      description: "name of js module you want to remove from NCA",
    },
  ];

  async run() {
    const {args } = this.parse(Remove)
    const { packageName } = args;
    let command:string = `yarn remove ${packageName}`;

    cli.action.start(`removing package ${packageName}`);
    try {
      await(exec(command, (error:any, stdout:any, stdin:any) => {
        if(error) this.log(error);
        this.log(stdout);
      }))
    } catch (error) {
      this.error(error);
      cli.action.stop('remove failed');
    }
    cli.action.stop('done');
  }
}
