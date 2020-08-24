import { Command, flags } from "@oclif/command";
import { exclusiveFlag } from "../utils";
import { cli } from 'cli-ux';
import typedi from 'typed-install';

export default class Add extends Command {
//   static description = "add and managing packages";

  static flags = {
    // help: flags.help({ char: "h" }),
    entity: flags.boolean({ char: "e", exclusive: exclusiveFlag("entities") }),
    usecase: flags.boolean({ char: "u", exclusive: exclusiveFlag("usecases") }),
    controllers: flags.boolean({
      char: "c",
      exclusive: exclusiveFlag("controllers"),
    }),
    interface: flags.boolean({
      char: "i",
      exclusive: exclusiveFlag("interfaces"),
    }),
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
    const {} = flags;
    cli.action.start('adding package ...');
    //TODO: use result to show detailed result
    let result;
    try{
      if (flags.entity){
        result = await typedi([packageName]);
        this.log("type added successfully into entity.");
      }
      if (flags.usecase){
        result = await typedi([packageName]);
        this.log("type added successfully into usecase.");
      }
      if(flags.controllers){
        result = await typedi([packageName]);
        this.log("type added successfully into controllers.");
      }
      if (flags.interface) {
        result = await typedi([packageName]);
        this.log("type added successfully into interface.");
      }
      if(flags.global){
        result = await typedi([packageName]);
        this.log("type added successfully into global.");
      }
       if (flags.dev){
        result = await typedi([packageName], {dev: true});
        this.log("type added successfully into dev.");
       }

       cli.action.stop('packages added successfully');
    }
    catch(err){
      this.error(err);
      cli.action.stop(`couldn\'t install package ${packageName}`)
    }
//     let result;
//     if (flags.entity) {
//       result = await addPackage("entities", packageName);
//     } else if (flags.usecase) {
//       result = await addPackage("usecase", packageName);
//     } else if (flags.controllers) {
//       result = await addPackage("controllers", packageName);
//     } else if (flags.interface) {
//       result = await addPackage("interface", packageName);
//     } else if (flags.infra) {
//       result = await addPackage("infra", packageName);
//     } else if (flags.global) {
//       result =await addPackage("global", packageName);

//     } else if (flags.dev) {
//       result = await addPackage("dev", packageName);
//     } else {
//       this.error('you must specify where to install package, like -e for entities');
//     }


  }
}
