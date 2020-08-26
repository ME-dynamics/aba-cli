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

function pathToLayer(
  isValidDir: IValidDirectory,
  error: TError,
  layer: TLayers
): string {
  /**
   * save current directory because after running function one time,
   * directory will change but isValidDir will show previous and correct results
   * so second run will result in isValidDir.base ===> downThRoad, but in reality
   * it is in packages, so it goes up and throw error   
   */
  const currentDir = process.cwd();
  let path = "";
  if (isValidDir.base === "root") {
    path = join(currentDir, "packages", layer);
    return path;
  } else if (isValidDir.base === "packages") {
    path = join(currentDir, layer);
    return path;
  } else if (isValidDir.base === "downTheRoad") {
    let upperPath = currentDir;
    for (let index = 0; index < 4; index++) {
      upperPath = join(upperPath, "..");
      process.chdir(upperPath);
      const checkUpperDir = isValidDirectory();
      if (checkUpperDir.base === "packages") {
        path = join(upperPath, layer);
        process.chdir(currentDir);
        return path;
      } 
    }
    throw error({err: "you should be at most four layers deep in nca projects"})
    
  } else {
    throw error({err:"should be in nca project" })
    
  }
  
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
      writeFileSync(`${entityPath}/${name}.ts`, entityFile);
    } catch (err) {
   
      error({err: err});
    }
  } else if (mode === "usecase") {
    if (!httpVerb)
      throw new Error("when creating use case, http verb must be defined");
    const usecase = usecaseLayer(name);
    const controller = controllerLayer(usecase.usecaseName, httpVerb);
    const interfaceFile = interfaceLayer(
      controller.controllerName,
      usecase.usecaseName
    );
    const usecasePath = pathToLayer(isValidDir, error, "usecases");
    const controllerPath = pathToLayer(isValidDir, error, "controllers");
    const interfacePath = pathToLayer(isValidDir, error, "interfaces");
    try {
      writeFileSync(`${usecasePath}/${name}.ts`, usecase.usecaseFile);
      writeFileSync(`${controllerPath}/${controller.controllerName}.ts`, controller.controllerFile);
      writeFileSync(`${interfacePath}/${name}.ts`, interfaceFile);
      cli.action.stop(`${name} created`);
    } catch (err) {
      error({err});
    }
  } else if (mode === "adapter") {
    // TODO: implement later, for db, events, grpc etc
    // INFO: these driver mey require libraries so will complete in time
  } else if (mode === "schema") {
    // TODO: implement later
  }
}
