import { join } from "path";
import { readdirSync } from "fs-extra";
import { IValidDirectory, TLibraries } from "../types";

function isRootDirectory(
  fileList: string[],
  mode: TLibraries
): IValidDirectory {
  const sharedFileNames = {
    packageJson: "package.json",
    docs: "docs",
    benchmarks: "benchmarks",
    tests: "__tests__",
    eslint: ".eslintrc.js",
    jest: "jest.config.js",
    ts: "tsconfig.json",
  };
  const ncaFileNames = {
    packages: "packages",
  };
  const nodelibFileNames = {
    src: "src",
  };
  // TODO: support RRN
  /**
   * using include to find string in array
   * it's a little more accurate for just checking existence, for finding
   * index will use indexOf (NaN in includes returns true but in indexOf returns -1)
   */

  if (
    fileList.includes(sharedFileNames.packageJson) &&
    fileList.includes(sharedFileNames.docs) &&
    fileList.includes(sharedFileNames.eslint) &&
    fileList.includes(sharedFileNames.benchmarks) &&
    fileList.includes(sharedFileNames.tests)
  ) {
    if (mode === "service" && fileList.includes(ncaFileNames.packages)) {
      return {
        isValid: true,
        base: "root",
        type: "service",
      };
    } else if (mode === "nodelib" && fileList.includes(nodelibFileNames.src)) {
      return {
        isValid: true,
        base: "root",
        type: "nodelib",
      };
    } else {
      return {
        isValid: false,
        base: null,
        type: null,
      };
    }
  } else {
    return {
      isValid: false,
      base: null,
      type: null,
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
    "types",
  ];
  const dirLength = directories.length;
  // should exactly match directories
  if (fileList.length !== dirLength) {
    return {
      isValid: false,
      base: null,
      type: null,
    };
  }
  for (let index = 0; index < dirLength; index++) {
    if (!fileList.includes(directories[index])) {
      // all should exist

      return {
        isValid: false,
        base: null,
        type: null,
      };
    }
  }
  return {
    isValid: true,
    base: "packages",
    type: "service",
  };
}

function traverseUpAndCheck(path: string, mode: TLibraries): IValidDirectory {
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
    const isPackages = isRootDirectory(fileList, mode);
    if (isPackages.isValid) {
      return {
        isValid: true,
        base: "downTheRoad",
        type: mode,
      };
    }
  }
  return {
    isValid: false,
    base: null,
    type: null,
  };
}
export function isValidDirectory(): IValidDirectory {
  // getting current path that cli is running from
  const path = process.cwd();
  const fileList = readdirSync(path);

  // check if it's in service root directory
  const isServiceRoot = isRootDirectory(fileList, "service");
  if (isServiceRoot.isValid) return isServiceRoot;

  // check if it's in nodelib root directory
  const isNodeLibRoot = isRootDirectory(fileList, "nodelib");
  if (isNodeLibRoot.isValid) return isNodeLibRoot;
  // TODO: check rrn

  // check if it's in packages directory
  const isPackages = isPackagesDirectory(fileList);
  if (isPackages.isValid) return isPackages;

  // check if it's down the road of service
  const serviceTraverse = traverseUpAndCheck(path, "service");
  if (serviceTraverse.isValid) return serviceTraverse;

  const nodelibTraverse = traverseUpAndCheck(path, "nodelib");
  if (nodelibTraverse.isValid) return nodelibTraverse;
  
  return {
    isValid: false,
    base: null,
    type: null,
  };
}
