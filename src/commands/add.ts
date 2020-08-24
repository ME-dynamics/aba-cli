import { Command, flags } from "@oclif/command";
import { cli } from "cli-ux";
import typedi from "typed-install";

import { db } from "../db";
import { exclusiveFlag, readPackageJson } from "../utils";
import { TLayers } from "../types";

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

  savePackages = async (argv: string[], dev: boolean, layer: TLayers) => {
    const pkgJson = readPackageJson();
    const database = await db(pkgJson.name);
    for (let index = 0; index < argv.length; index++) {
      const packages = dev
        ? Object.keys(pkgJson.devDependencies)
        : Object.keys(pkgJson.dependencies);
      const packageName = argv[index];
      if (packages.includes(packageName)) {
        const version = dev
          ? pkgJson.devDependencies[packageName]
          : pkgJson.dependencies[packageName];
        await database.add({ packageName, dev, layer, version });
      } else {
        throw new Error(
          `there was a problem in installing package: ${packageName}`
        );
      }
    }
  };
  async run() {
    const { argv, flags } = this.parse(Add);
    // const { packageName } = args;
    const { entity, controllers, dev, global, usecase } = flags;
    const interfaceLayer = flags.interface;

    cli.action.start("adding package ...");

    try {
      if (entity) {
        await typedi(argv);
        await this.savePackages(argv, false, "entities");
        this.log(
          `${argv.toString()} successfully added with types, saved info into entity section`
        );
      } else if (usecase) {
        await typedi(argv);
        await this.savePackages(argv, false, "usecases");
        this.log(
          `${argv.toString()} successfully added with types, saved info into usecase section`
        );
      } else if (controllers) {
        await this.savePackages(argv, false, "controllers");
        await typedi(argv);
        this.log(
          `${argv.toString()} successfully added with types, saved info into controllers section`
        );
      } else if (interfaceLayer) {
        await this.savePackages(argv, false, "interfaces");
        await typedi(argv);
        this.log(
          `${argv.toString()} successfully added with types, saved info into interface section`
        );
      } else if (global) {
        await typedi(argv);
        await this.savePackages(argv, false, "global");
        this.log(
          `${argv.toString()} successfully added with types, saved info into global section`
        );
      } else if (dev) {
        await typedi(argv, { dev: true });
        await this.savePackages(argv, false, "dev");
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
