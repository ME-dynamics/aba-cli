import { join } from "path";
import { copy, remove } from "fs-extra";
import { TLibraries } from "../types";
import { ErrorFactory } from 'aba-utils';
/**
 * because files from github are in folder named your-project-master
 * when downloaded from github, this will move it's files a level up
 * to fix this extra folder
 */

export async function moveTemplateFiles(serviceName: string, mode: TLibraries) {
  const rootPath = join(process.cwd(), serviceName);
  const dir =
    mode === "service"
      ? "nca-template-master"
      : mode === "nodelib"
      ? "nodelib-template-master"
      : "rrn-template-master";
  const path = join(rootPath, dir);
  try {
    await copy(path, rootPath, { dereference: true, recursive: true });
    // struggle to get move working, copy works just fine
    await remove(path);
  } catch (error) {
    throw new ErrorFactory({
      name: "fsError",
      message: "unable to move template file to root folder",
      detail: "",
      nativeError: error,
      path: process.cwd(),
      timestamp: undefined
    })
  }
}



