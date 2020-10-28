import { Command, flags } from "@oclif/command";
import ora from "ora";

import { exclusive_flag, terminate_with_error } from "../utils";
import { package_info, yarn_client } from "../package-manager";

export default class Add extends Command {
  static description = "adds packages to your project";
  static examples = [
    `$ aba add -e entity_package`,
    `$ aba add -a adapter_package`,
    `$ aba add -u usecase_package`,
    `$ aba add -c controller_package`,
    `$ aba add -i interface_package`,
    `$ aba add -g global_package`,
    `$ aba add -n nodelib_package`,
    `$ aba add -D dev_package`,
  ];
  static flags = {
    // help: flags.help({ char: "h" }),
    entity: flags.boolean({
      char: "e",
      exclusive: exclusive_flag("entities"),
      description: "saves package info in entities section",
    }),
    adapter: flags.boolean({
      char: "a",
      exclusive: exclusive_flag("adapters"),
      description: "saves package info in adapter section",
    }),
    usecase: flags.boolean({
      char: "u",
      exclusive: exclusive_flag("usecases"),
      description: "saves package info in usecase section",
    }),
    controllers: flags.boolean({
      char: "c",
      exclusive: exclusive_flag("controllers"),
      description: "saves package info in controllers section",
    }),
    interface: flags.boolean({
      char: "i",
      exclusive: exclusive_flag("interfaces"),
      description: "saves package info in interface section",
    }),
    global: flags.boolean({
      char: "g",
      exclusive: exclusive_flag("global"),
      description:
        "saves package info in global (global to current package) section",
    }),
    nodelib: flags.boolean({
      char: "n",
      exclusive: exclusive_flag("dev"),
      description: "saves package for node library",
    }),
    dev: flags.boolean({
      char: "D",
      exclusive: exclusive_flag("dev"),
      description: "saves package info in development section",
    }),
  };
  static strict = false;
  static args = [
    {
      name: "package_name",
      required: true,
      description: "names of npm package you want to add to your nca project",
    },
  ];

  async run() {
    const { argv, flags } = this.parse(Add);
    const {
      entity,
      controllers,
      dev,
      global,
      usecase,
      nodelib,
      adapter,
    } = flags;
    const interface_layer = flags.interface;

    const spinner = ora("adding packages").start();
    try {
      if (entity) {
        await yarn_client.add(argv);
        await package_info({
          argv,
          dev: false,
          layer: "entities",
          mode: "add",
        });
        spinner.succeed("package(s) installed");
      } else if (usecase) {
        await yarn_client.add(argv);
        await package_info({
          argv,
          dev: false,
          layer: "usecases",
          mode: "add",
        });
        spinner.succeed("package(s) installed");
      } else if (controllers) {
        await yarn_client.add(argv);
        await package_info({
          argv,
          dev: false,
          layer: "controllers",
          mode: "add",
        });
        spinner.succeed("package(s) installed");
      } else if (interface_layer) {
        await yarn_client.add(argv);
        await package_info({
          argv,
          dev: false,
          layer: "interfaces",
          mode: "add",
        });
        spinner.succeed("package(s) installed");
      } else if (adapter) {
        await yarn_client.add(argv);
        await package_info({
          argv,
          dev: false,
          layer: "adapters",
          mode: "add",
        });
        spinner.succeed("package(s) installed");
      } else if (global) {
        await yarn_client.add(argv);
        await package_info({ argv, dev: false, layer: "global", mode: "add" });
        spinner.succeed("package(s) installed");
      } else if (nodelib) {
        await yarn_client.add(argv);
        await package_info({ argv, dev: false, layer: "none", mode: "add" });
        spinner.succeed("package(s) installed");
      } else if (dev && nodelib) {
        await yarn_client.add_dev(argv);
        await package_info({ argv, dev: true, layer: "dev", mode: "add" });
        spinner.succeed("package(s) installed");
      } else if (dev) {
        await yarn_client.add_dev(argv);
        await package_info({ argv, dev: false, layer: "dev", mode: "add" });
        spinner.succeed("package(s) installed");
      } else {
        spinner.fail(
          "you should define the scope you want the package to be installed"
        );
      }
    } catch (error) {
      spinner.fail("`couldn't install package(s)");
      terminate_with_error(error, error.exitCode);
    }
  }
}
