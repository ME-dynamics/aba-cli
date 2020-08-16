import { join } from "path";
import { readdirSync } from "fs-extra";
import { IValidDirectory } from "../types";

function isRootDirectory(fileList: string[]): IValidDirectory {
  const fileNames = {
    packageJson: "package.json",
    packages: "packages",
    docs: "docs",
    eslint: ".eslintrc.js",
    benchmarks: "benchmarks",
    tests: "__tests__"
  };
  /**
   * using include to find string in array
   * it's a little more accurate for just checking existence, for finding
   * index will use indexOf (NaN in includes returns true but in indexOf returns -1)
   */
  if (
    fileList.includes(fileNames.packages) &&
    fileList.includes(fileNames.packageJson) &&
    fileList.includes(fileNames.docs) &&
    fileList.includes(fileNames.eslint) &&
    fileList.includes(fileNames.benchmarks) &&
    fileList.includes(fileNames.tests)
  ) {
    return {
      isValid: true,
      base: "root",
    };
  } else {
    return {
      isValid: false,
      base: null,
    };
  }
}

function isPackagesDirectory(fileList: string[]): IValidDirectory {
  const directories = [
    "entities",
    "controllers",
    "usecases",
    "adapters",
    "interfaces",
    "schemas",
    "types"
  ];
  const dirLength = directories.length;
  // should exactly match directories
  if (fileList.length !== dirLength) {
    return {
      isValid: false,
      base: null,
    };
  }
  for (let index = 0; index < dirLength; index++) {
    if (!fileList.includes(directories[index])) {
      // all should exist

      return {
        isValid: false,
        base: null,
      };
    }
  }
  return {
    isValid: true,
    base: "packages",
  };
}

function traverseUpAndCheck(path: string): IValidDirectory {
  /**
   * will go to up level directory up to three level
   * cause if two conditions above fail, user should in one of packages
   * and maybe in one folder doing some operation, the last level is for some
   * component folder inside (usually should not exists or code is too complicated
   * and should split)
   */
  let upDir: string = path;
  for (let index = 0; index < 3; index++) {
    upDir = join(upDir, "..");
    const fileList = readdirSync(upDir);
    const isPackages = isPackagesDirectory(fileList);
    if (isPackages.isValid) {
      return {
        isValid: true,
        base: "downTheRoad",
      };
    }
  }
  return {
    isValid: false,
    base: null,
  };
}
export function isValidDirectory(): IValidDirectory {
  // getting current path that cli is running from
  const path = process.cwd();
  const fileList = readdirSync(path);

  // check if it's in root directory
  const isRoot = isRootDirectory(fileList);
  if (isRoot.isValid) return isRoot;

  // check if it's in packages directory
  const isPackages = isPackagesDirectory(fileList);
  if (isPackages.isValid) return isPackages;
  // check if it's down the road
  const traverse = traverseUpAndCheck(path);
  
  if (traverse.isValid) {
    return traverse;
  } else {
    return {
      isValid: false,
      base: null,
    };
  }
}

