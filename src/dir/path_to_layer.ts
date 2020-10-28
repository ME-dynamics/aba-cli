import { is_valid_directory } from "./is_valid_directory";
import { join } from "path";
import { ErrorFactory } from "aba-utils";
import { t_layers } from "../types";

export function path_to_layer(layer: t_layers): string {
  /**
   * save current directory because after running function one time,
   * directory will change but isValidDir will show previous and correct results
   * so second run will result in isValidDir.base ===> downThRoad, but in reality
   * it is in packages, so it goes up and throw error
   */
  const current_dir = process.cwd();
  const is_valid_dir = is_valid_directory();
  let path = "";
  if (is_valid_dir.base === "root") {
    path = join(current_dir, "packages", layer);
    return path;
  } else if (is_valid_dir.base === "packages") {
    path = join(current_dir, layer);
    return path;
  } else if (is_valid_dir.base === "down_the_road") {
    let upper_path = current_dir;
    for (let index = 0; index < 4; index++) {
      upper_path = join(upper_path, "..");
      process.chdir(upper_path);
      const check_upper_dir = is_valid_directory();
      if (check_upper_dir.base === "packages") {
        path = join(upper_path, layer);
        process.chdir(current_dir);
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
