import { writeFileSync } from "fs-extra";
import { cli } from "cli-ux";
import {
  controllerLayer,
  entityLayer,
  interfaceLayer,
  usecaseLayer,
} from "./layerTemplates";
import { ICreateLayer, IValidDirectory, TError, TLayers } from "../types";
import { isValidDirectory } from "../dir";
import { join } from "path";

function pathToLayer(isValidDir: IValidDirectory, error: TError, layer: TLayers): string {
  let path = "";
  if (isValidDir.base === "root") {
    path = join(process.cwd(), "packages", layer);
  } else if (isValidDir.base === "packages") {
    path = join(process.cwd(), layer);
  } else if (isValidDir.base === "downTheRoad") {
    let upperPath = process.cwd();
    for (let index = 0; index < 3; index++) {
      upperPath = join(upperPath, "..");
      process.chdir(upperPath);
      const checkUpperDir = isValidDirectory();
      if (checkUpperDir.base === "packages") {
        path = join(upperPath, layer);
        break;
      } else {
        error({ err: "at most three layers deep in packages!" });
        return "";
      }
    }
  }
  return path;
}

export function createLayer(args: ICreateLayer) {
  const { error, log, mode, name, httpVerb } = args;
  const isValidDir = isValidDirectory();
  if (!isValidDir.isValid) {
    error({
      err:
        "not a valid node clean architecture project, are you sure you're in nca directory",
    });
    return;
  }
  cli.action.start(`creating ${mode}: ${name}`);
  if (mode === "entity") {
    const entityFile = entityLayer(name);
    let entityPath = pathToLayer(isValidDir, error, "entities");
    try {
      writeFileSync(entityPath, entityFile);
    } catch (err) {
      error(err);
    }
  } else if (mode === "usecase") {
    if(!httpVerb) throw new Error("when creating use case, http verb must be defined");
    const usecase = usecaseLayer(name);
    const controller = controllerLayer(usecase.usecaseName, httpVerb);
    const interfaceFile = interfaceLayer(controller.controllerName, usecase.usecaseName);
    const usecasePath = pathToLayer(isValidDir, error, "usecases");
    const controllerPath = pathToLayer(isValidDir, error, "controllers");
    const interfacePath = pathToLayer(isValidDir, error, "interfaces");
    try {
        writeFileSync(usecasePath, usecase.usecaseFile);
        writeFileSync(controllerPath, controller.controllerFile);
        writeFileSync(interfacePath, interfaceFile);
    } catch (error) {
        error(error);
    }
  } else if (mode === "adapter") {
  } else if (mode === "schema") {
  }
}
