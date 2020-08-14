import {Command } from '@oclif/command'
import { removePackage } from '../utils';
import { cli } from 'cli-ux';
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
    cli.action.start(`removing package ${packageName}`);    
    try {
      await removePackage(packageName)
    } catch (error) {
      this.error(error);
    }
    cli.action.stop('done');
  }
}
