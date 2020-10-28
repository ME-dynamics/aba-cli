import { join } from "path";
import { copy, remove } from "fs-extra";
import { t_libraries } from "../types";
import { ErrorFactory } from 'aba-utils';
/**
 * because files from github are in folder named your-project-master
 * when downloaded from github, this will move it's files a level up
 * to fix this extra folder
 */

export async function move_template_files(service_name: string, mode: t_libraries) {
  const root_path = join(process.cwd(), service_name);
  const dir =
    mode === "service"
      ? "nca-template-master"
      : mode === "nodelib"
      ? "nodelib-template-master"
      : "rrn-template-master";
  const path = join(root_path, dir);
  try {
    await copy(path, root_path, { dereference: true, recursive: true });
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



