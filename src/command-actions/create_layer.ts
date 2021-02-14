import { writeFileSync } from "fs-extra";
import ora from "ora";
import { prompt } from "inquirer";
import {
  controller_layer,
  entity_layer,
  interface_layer,
  usecase_layer,
} from "../template";
import { path_to_layer } from "../dir";
import { terminate_with_error } from "../utils";
import { i_create_layer } from "../types";


/**
 * generates files for node clean architecture. creates entity, usecase with its controller and interface.
 * also generate template for adapters and schemas. 
 * @param args object containing layer mode and name,
 * mode is entity, usecase, adapters and schemas
 */
export async function create_layer(args: i_create_layer) {
  const { mode, name } = args;
  const layer_path = path_to_layer(mode);
  const spinner = ora(`${mode}: creating layer ${name}`);
  if (mode === "entities") {
    spinner.start();
    const entityFile = entity_layer(name);
    try {
      writeFileSync(`${layer_path}/${name}.ts`, entityFile);
      spinner.succeed(`${mode}: layer ${name} created`);
    } catch (error) {
      terminate_with_error(error, error.exitCode);
    }
  } else if (mode === "usecases") {
    spinner.info();
    const { http_verb } = await prompt([
      {
        name: "http_verb",
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
    const usecase_file = usecase_layer(name);
    const { controller_file, controller_name } = controller_layer(
      name,
      http_verb
    );
    const interface_file = interface_layer(controller_name, name);
    const usecase_path = path_to_layer("usecases");
    const controller_path = path_to_layer("controllers");
    const interface_path = path_to_layer("interfaces");
    try {
      writeFileSync(`${usecase_path}/${name}.ts`, usecase_file);
      writeFileSync(
        `${controller_path}/${controller_name}.ts`,
        controller_file
      );
      writeFileSync(`${interface_path}/${name}.ts`, interface_file);
      spinner.succeed(`${mode}: layer ${name} created`);
    } catch (error) {
      spinner.fail(`${mode}: failed to create layer ${name}`);
      terminate_with_error(error, error.exitCode);
    }
  } else if (mode === "adapters") {
    // TODO: implement later, for db, events, grpc etc
    // INFO: these driver mey require libraries so will complete in time
  } else if (mode === "schemas") {
    // TODO: implement later
  }
}
