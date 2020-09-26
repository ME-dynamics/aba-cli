import { IValidDirectory } from "../types"

export function isPackagesDir(fileList: string[]): IValidDirectory {
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
        validDir: false,
        base: undefined,
        type: undefined,
      };
    }
    for (let index = 0; index < dirLength; index++) {
      if (!fileList.includes(directories[index])) {
        // all should exist
        return {
          validDir: false,
          base: undefined,
          type: undefined,
        };
      }
    }
    return {
      validDir: true,
      base: "packages",
      type: "service",
    };
  }