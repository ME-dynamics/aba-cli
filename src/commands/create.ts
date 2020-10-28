import { Command } from "@oclif/command";
import { create_layer, create_lib} from "../command-actions";

export default class Create extends Command {
  static description =
    "creates node js clean architecture, nca layers, node libraries and react + react native project";
  static examples = [
    `$ aba create service service_name`,
    `$ aba create nodelib lib_name`,
    `$ aba create rrn rrn_name`,
    `$ aba create entity entity_name`,
    `$ aba create usecase usecase_name`,
    `$ aba create adapter adapter_name`,
    `$ aba create schema schema_name`,
  ];

  static args = [
    {
      name: "mode",
      required: true,
      description: "create NCA, RRN, node library or create NCA layers",
      hidden: false,
      options: [
        "service",
        "nodelib",
        "rrn",
        "entity",
        "usecase",
        "adapter",
        "schema",
      ], // only allow input to be from a discrete set
    },
    {
      name: "name",
      required: true,
      description: "the package / layer name you want to create",
      hidden: false,
    },
  ];
  async run() {
    const { args } = this.parse(Create);
    const { mode, name } = args;
    if (mode === "service") {
      const service_mode = "service";
      const service_name = `${name}`;
      await create_lib({
        name: service_name,
        mode: service_mode,
      });
    } else if (mode === "nodelib") {
      const service_mode = "nodelib";
      const service_name = `${name}`;
      await create_lib({
        name: service_name,
        mode: service_mode,
      });
    } else if (mode === "rrn") {
      const service_mode = "rrn";
      const service_name = `${name}`;
      await create_lib({
        name: service_name,
        mode: service_mode,
      });
    } else if (mode === "entity") {
      await create_layer({
        mode: "entities",
        name,
      });
    } else if (mode === "usecase") {
      await create_layer({
        mode: "usecases",
        name,
      });
    } else if (mode === "adapter") {
      this.warn("not implemented yet")
    } else if (mode === "schema") {
      this.warn("not implemented yet")
    }
  }
}
