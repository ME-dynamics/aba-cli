import { IValidDirectory, TLibraries } from "../types";

export function isRootDir(
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

  if (
    fileList.includes(sharedFileNames.packageJson) &&
    fileList.includes(sharedFileNames.docs) &&
    fileList.includes(sharedFileNames.eslint) &&
    fileList.includes(sharedFileNames.benchmarks) &&
    fileList.includes(sharedFileNames.tests)
  ) {
    if (mode === "service" && fileList.includes(ncaFileNames.packages)) {
      return {
        validDir: true,
        base: "root",
        type: "service",
      };
    } else if (mode === "nodelib" && fileList.includes(nodelibFileNames.src)) {
      return {
        validDir: true,
        base: "root",
        type: "nodelib",
      };
    } else {
      return {
        validDir: false,
        base: undefined,
        type: undefined,
      };
    }
  } else {
    return {
      validDir: false,
      base: undefined,
      type: undefined,
    };
  }
}
