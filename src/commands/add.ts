import { Command, flags } from "@oclif/command";
import ora from "ora";

import { exclusiveFlag, terminateWithError } from "../utils";
import { packageInfo, yarnClient } from "../packageManager";

export default class Add extends Command {
  static description = "adds packages to your project";
  static examples = [
    `$ aba add -e entityPackage`,
    `$ aba add -a adapterPackage`,
    `$ aba add -u usecasePackage`,
    `$ aba add -c controllerPackage`,
    `$ aba add -i interfacePackage`,
    `$ aba add -g globalPackage`,
    `$ aba add -n nodelibPackage`,
    `$ aba add -D devPackage`,
  ];
  static flags = {
    // help: flags.help({ char: "h" }),
    entity: flags.boolean({
      char: "e",
      exclusive: exclusiveFlag("entities"),
      description: "will save package info in entities section",
    }),
    adapter: flags.boolean({
      char: "a",
      exclusive: exclusiveFlag("adapters"),
      description: "will save package info in adapter section",
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
      description:
        "will save package info in global (global to current package) section",
    }),
    nodelib: flags.boolean({
      char: "n",
      exclusive: exclusiveFlag("dev"),
      description: "will save package for node library",
    }),
    dev: flags.boolean({
      char: "D",
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
    const {
      entity,
      controllers,
      dev,
      global,
      usecase,
      nodelib,
      adapter,
    } = flags;
    const interfaceLayer = flags.interface;

    const spinner = ora("adding packages").start();
    try {
      if (entity) {
        await yarnClient.add(argv);
        await packageInfo({ argv, dev: false, layer: "entities", mode: "add" });
        spinner.succeed("package(s) installed");
      } else if (usecase) {
        await yarnClient.add(argv);
        await packageInfo({ argv, dev: false, layer: "usecases", mode: "add" });
        spinner.succeed("package(s) installed");
      } else if (controllers) {
        await yarnClient.add(argv);
        await packageInfo({
          argv,
          dev: false,
          layer: "controllers",
          mode: "add",
        });
        spinner.succeed("package(s) installed");
      } else if (interfaceLayer) {
        await yarnClient.add(argv);
        await packageInfo({
          argv,
          dev: false,
          layer: "interfaces",
          mode: "add",
        });
        spinner.succeed("package(s) installed");
      } else if (adapter) {
        await yarnClient.add(argv);
        await packageInfo({ argv, dev: false, layer: "adapters", mode: "add" });
        spinner.succeed("package(s) installed");
      } else if (global) {
        await yarnClient.add(argv);
        await packageInfo({ argv, dev: false, layer: "global", mode: "add" });
        spinner.succeed("package(s) installed");
      } else if (nodelib) {
        await yarnClient.add(argv);
        await packageInfo({ argv, dev: false, layer: "none", mode: "add" });
        spinner.succeed("package(s) installed");
      } else if (dev && nodelib) {
        await yarnClient.addDev(argv);
        await packageInfo({ argv, dev: true, layer: "dev", mode: "add" });
        spinner.succeed("package(s) installed");
      } else if (dev) {
        await yarnClient.addDev(argv);
        await packageInfo({ argv, dev: false, layer: "dev", mode: "add" });
        spinner.succeed("package(s) installed");
      } else {
        spinner.fail(
          "you should define the scope you want the package to be installed"
        );
      }
    } catch (error) {
      spinner.fail("`couldn't install package(s)");
      terminateWithError(error, error.exitCode);
    }
  }
}
