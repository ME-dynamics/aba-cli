import { Command, flags } from "@oclif/command";
import { cli } from "cli-ux";
import typedi from "typed-install";

import { exclusiveFlag } from "../utils";
import { packageInfo } from "../packageManager";

export default class Add extends Command {
  //   static description = "add and managing packages";

  static flags = {
    // help: flags.help({ char: "h" }),
    entity: flags.boolean({
      char: "e",
      exclusive: exclusiveFlag("entities"),
      description: "will save package info in entities section",
    }),
    usecase: flags.boolean({
      char: "u",
      exclusive: exclusiveFlag("usecases"),
      description: "will save package info in usecase section",
    }),
    controllers: flags.boolean({
      char: "c",
      exclusive: exclusiveFlag("controllers"),
      description: "will save package info in controllers section",
    }),
    interface: flags.boolean({
      char: "i",
      exclusive: exclusiveFlag("interfaces"),
      description: "will save package info in interface section",
    }),
    global: flags.boolean({
      char: "g",
      exclusive: exclusiveFlag("global"),
      description: "will save package info in global section",
    }),
    dev: flags.boolean({
      char: "d",
      exclusive: exclusiveFlag("dev"),
      description: "will save package info in development section",
    }),
  };
  static strict = false;
  static args = [
    {
      name: "packageName",
      required: true,
      description: "names of npm package you want to add to your nca project",
    },
  ];

  async run() {
    const { argv, flags } = this.parse(Add);
    // const { packageName } = args;
    const { entity, controllers, dev, global, usecase } = flags;
    const interfaceLayer = flags.interface;

    cli.action.start("adding package ...");

    try {
      if (entity) {
        await typedi(argv);
        await packageInfo({argv, dev: false, layer: "entities", mode: "add"});
        this.log(
          `${argv.toString()} successfully added with types, saved info into entity section`
        );
      } else if (usecase) {
        await typedi(argv);
        await packageInfo({argv, dev: false, layer: "usecases", mode: "add"});
        this.log(
          `${argv.toString()} successfully added with types, saved info into usecase section`
        );
      } else if (controllers) {
        await packageInfo({argv, dev: false, layer: "controllers", mode: "add"});
        await typedi(argv);
        this.log(
          `${argv.toString()} successfully added with types, saved info into controllers section`
        );
      } else if (interfaceLayer) {
        await packageInfo({argv, dev: false, layer: "interfaces", mode: "add"});
        await typedi(argv);
        this.log(
          `${argv.toString()} successfully added with types, saved info into interface section`
        );
      } else if (global) {
        await typedi(argv);
        await packageInfo({argv, dev: false, layer: "global", mode: "add"});
        this.log(
          `${argv.toString()} successfully added with types, saved info into global section`
        );
      } else if (dev) {
        await typedi(argv, { dev: true });
        await packageInfo({argv, dev: false, layer: "dev", mode: "add"});
        this.log(
          `${argv.toString()} successfully added with types, saved info into development section`
        );
      } else {
        this.error(
          "you should define the scope you want the package to be installed"
        );
      }
      cli.action.stop();
    } catch (err) {
      cli.action.stop(`couldn\'t install package ${argv.toString()}`);
      this.error(err);
    }
  }
}
