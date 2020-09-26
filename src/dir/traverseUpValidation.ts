import {  readdirSync } from "fs-extra";
import { join } from "path"
import { isRootDir } from "./isRootDir";

import { TLibraries, IValidDirectory } from "../types"






export function traverseUpValidation(path: string, mode: TLibraries): IValidDirectory {
    /**
     * checks directories upward in four steps
     * if package is not recognized as node lib or service, (may be rrn) then it fail
     * even if user maybe in a valid package, but this tree of folder just complicates code
     * and coder should try to flatten modules as much as possible
     */
    let upDir: string = path;
    for (let index = 0; index < 4; index++) {
      upDir = join(upDir, "..");
      const fileList = readdirSync(upDir);
      const isRoot = isRootDir(fileList, mode);
      if (isRoot.validDir) {
        return {
          validDir: true,
          base: "downTheRoad",
          type: mode,
        };
      }
    }
    return {
      validDir: false,
      base: undefined,
      type: undefined,
    };
  }