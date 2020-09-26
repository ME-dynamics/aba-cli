import { isValidDirectory } from "./isValidDirectory";
import { join } from "path";
import { ErrorFactory } from "aba-utils";
import { TLayers } from "../types";

export function pathToLayer(layer: TLayers): string {
  /**
   * save current directory because after running function one time,
   * directory will change but isValidDir will show previous and correct results
   * so second run will result in isValidDir.base ===> downThRoad, but in reality
   * it is in packages, so it goes up and throw error
   */
  const currentDir = process.cwd();
  const isValidDir = isValidDirectory();
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
    throw new ErrorFactory({
      name: "NCAError",
      message: "you should be at most four layers deep in nca projects",
      detail: "",
      nativeError: undefined,
      path: process.cwd(),
      timestamp: undefined,
    });
  } else {
    throw new ErrorFactory({
        name: "NCAError",
        message: "you should be in nca project",
        detail: "",
        nativeError: undefined,
        path: process.cwd(),
        timestamp: undefined
    })
  }
}
