import { writeFileSync } from "fs-extra";
import ora from "ora";
import { prompt } from "inquirer";
import {
  controllerLayer,
  entityLayer,
  interfaceLayer,
  usecaseLayer,
} from "../template";
import { pathToLayer } from "../dir";
import { terminateWithError } from "../utils";
import { ICreateLayer } from "../types";

export async function createLayer(args: ICreateLayer) {
  const { mode, name } = args;
  const layerPath = pathToLayer(mode);
  const spinner = ora(`${mode}: creating layer ${name}`);
  if (mode === "entities") {
    spinner.start();
    const entityFile = entityLayer(name);
    try {
      writeFileSync(`${layerPath}/${name}.ts`, entityFile);
      spinner.succeed(`${mode}: layer ${name} created`);
    } catch (error) {
      terminateWithError(error, error.exitCode);
    }
  } else if (mode === "usecases") {
    spinner.info();
    const { httpVerb } = await prompt([
      {
        name: "httpVerb",
        message: "what method will this usecase respond to?",
        type: "list",
        choices: [
          "GET",
          "HEAD",
          "POST",
          "PUT",
          "PATCH",
          "DELETE",
          "OPTIONS",
          "CONNECT",
          "TRACE",
          "EVENT",
        ],
      },
    ]);
    const usecaseFile = usecaseLayer(name);
    const { controllerFile, controllerName } = controllerLayer(name, httpVerb);
    const interfaceFile = interfaceLayer(controllerName, name);
    const usecasePath = pathToLayer("usecases");
    const controllerPath = pathToLayer("controllers");
    const interfacePath = pathToLayer("interfaces");
    try {
      writeFileSync(`${usecasePath}/${name}.ts`, usecaseFile);
      writeFileSync(`${controllerPath}/${controllerName}.ts`, controllerFile);
      writeFileSync(`${interfacePath}/${name}.ts`, interfaceFile);
      spinner.succeed(`${mode}: layer ${name} created`);
    } catch (error) {
      spinner.fail(`${mode}: failed to create layer ${name}`);
      terminateWithError(error, error.exitCode);
    }
  } else if (mode === "adapters") {
    // TODO: implement later, for db, events, grpc etc
    // INFO: these driver mey require libraries so will complete in time
  } else if (mode === "schemas") {
    // TODO: implement later
  }
}
