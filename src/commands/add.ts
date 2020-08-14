import { Command, flags } from "@oclif/command";
import { exclusiveFlag, addPackage } from "../utils";
import { cli } from 'cli-ux';
export default class Add extends Command {
  static description = "add and managing packages";

  static flags = {
    // help: flags.help({ char: "h" }),
    entity: flags.boolean({ char: "e", exclusive: exclusiveFlag("entities") }),
    usecase: flags.boolean({ char: "u", exclusive: exclusiveFlag("usecase") }),
    controllers: flags.boolean({
      char: "c",
      exclusive: exclusiveFlag("controllers"),
    }),
    interface: flags.boolean({
      char: "i",
      exclusive: exclusiveFlag("interface"),
    }),
    infra: flags.boolean({ char: "s", exclusive: exclusiveFlag("infra") }),
    global: flags.boolean({ char: "g", exclusive: exclusiveFlag("global") }),
    dev: flags.boolean({char: 'd', exclusive: exclusiveFlag('dev')})
  };

  static args = [
    {
      name: "packageName",
      required: true,
      description: "name of js module you want to add to NCA",
    },
  ];

  async run() {
    const { args, flags } = this.parse(Add);
    const { packageName } = args;
    cli.action.start('adding package ...');
    let result;
    if (flags.entity) {
      result = await addPackage("entities", packageName);
    } else if (flags.usecase) {
      result = await addPackage("usecase", packageName);
    } else if (flags.controllers) {
      result = await addPackage("controllers", packageName);
    } else if (flags.interface) {
      result = await addPackage("interface", packageName);
    } else if (flags.infra) {
      result = await addPackage("infra", packageName);
    } else if (flags.global) {
      result =await addPackage("global", packageName);
      
    } else if (flags.dev) {
      result = await addPackage("dev", packageName);
    } else {
      this.error('you must specify where to install package, like -e for entities');
    }
    if(result.status === "added") {
      cli.action.stop('done');
    } else if (result.status === "alreadyInstalled") {
      cli.action.stop(result.status);
    } else {
      cli.action.stop(result.status);
      result.error && this.error(result.error)
    }
    
  }
}
