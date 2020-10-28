import {  readdirSync } from "fs-extra";
import { join } from "path"
import { is_root_dir } from "./is_root_dir";

import { t_libraries, i_valid_directory } from "../types"






export function traverse_up_validation(path: string, mode: t_libraries): i_valid_directory {
    /**
     * checks directories upward in four steps
     * if package is not recognized as node lib or service, (may be rrn) then it fail
     * even if user maybe in a valid package, but this tree of folder just complicates code
     * and coder should try to flatten modules as much as possible
     */
    let up_dir: string = path;
    for (let index = 0; index < 4; index++) {
      up_dir = join(up_dir, "..");
      const file_list = readdirSync(up_dir);
      const is_root = is_root_dir(file_list, mode);
      if (is_root.valid_dir) {
        return {
          valid_dir: true,
          base: "down_the_road",
          type: mode,
        };
      }
    }
    return {
      valid_dir: false,
      base: undefined,
      type: undefined,
    };
  }