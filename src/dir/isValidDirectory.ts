import { readdirSync } from "fs-extra";
import { isRootDir } from "./isRootDir";
import { isPackagesDir } from "./isPackagesDir";
import { traverseUpValidation } from "./traverseUpValidation"
import { IValidDirectory } from "../types";






export function isValidDirectory(): IValidDirectory {
  // getting current path that cli is running from
  const path = process.cwd();
  const fileList = readdirSync(path);

  // check if it's in service root directory
  const isServiceRoot = isRootDir(fileList, "service");
  if (isServiceRoot.validDir) return isServiceRoot;

  // check if it's in nodelib root directory
  const isNodeLibRoot = isRootDir(fileList, "nodelib");
  if (isNodeLibRoot.validDir) return isNodeLibRoot;
  // TODO: check rrn

  // check if it's in packages directory
  const isPackages = isPackagesDir(fileList);
  if (isPackages.validDir) return isPackages;

  // check if it's down the road of service
  const serviceTraverse = traverseUpValidation(path, "service");
  if (serviceTraverse.validDir) return serviceTraverse;

  const nodelibTraverse = traverseUpValidation(path, "nodelib");
  if (nodelibTraverse.validDir) return nodelibTraverse;
  
  return {
    validDir: false,
    base: undefined,
    type: undefined,
  };
}
