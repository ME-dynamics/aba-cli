import { Command, flags } from "@oclif/command";
import { createLib } from "../commandActions";
import { IError, ILog } from "../types";
export default class Create extends Command {
  static description = "creates node js clean architecture micro service";
  static examples = [`$ aba create yourServiceName`];

  // static flags = {
  //   help: flags.help({ char: "h" }),
  //   // flag with a value (-n, --name=VALUE)
  //   name: flags.string({ char: "n", description: "name to print" }),
  //   // flag with no value (-f, --force)
  //   force: flags.boolean({ char: "f" }),
  // };

  static args = [
    {
      name: "mode",
      required: true,
      description: "choose what to create",
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
  logErr = (args: IError) => {
    const { err, errCode } = args;
    this.error(err, { code: errCode });
  };
  logInfo = (args: ILog) => {
    const { message } = args;
    this.log(message);
  };
  async run() {
    const { args, flags } = this.parse(Create);
    const { mode, name } = args;
    if (mode === "service") {
      const serviceMode = "service";
      const serviceName = `${name}`;
      await createLib({
        name: serviceName,
        mode: serviceMode,
        error: this.logErr,
        log: this.logInfo,
      });
    } else if (mode === "nodelib"){
      const serviceMode = "nodelib";
      const serviceName = `${name}`;
      await createLib({
        name: serviceName,
        mode: serviceMode,
        error: this.logErr,
        log: this.logInfo,
      });
    } else if (mode === "rrn"){
      const serviceMode = "rrn";
      const serviceName = `${name}`;
      await createLib({
        name: serviceName,
        mode: serviceMode,
        error: this.logErr,
        log: this.logInfo,
      });
    } else if (mode === "entity") {

    } else if (mode === "usecase") {

    } else if (mode === "adapter") {

    } else if (mode === "schema") {

    }
  }
}
