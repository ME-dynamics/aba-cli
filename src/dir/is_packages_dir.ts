import { i_valid_directory } from "../types"

export function is_packages_dir(file_list: string[]): i_valid_directory {
    const directories = [
      "entities",
      "controllers",
      "usecases",
      "adapters",
      "interfaces",
      "schemas",
      "types",
    ];
    const dir_length = directories.length;
    // should exactly match directories
    if (file_list.length !== dir_length) {
      return {
        valid_dir: false,
        base: undefined,
        type: undefined,
      };
    }
    for (let index = 0; index < dir_length; index++) {
      if (!file_list.includes(directories[index])) {
        // all should exist
        return {
          valid_dir: false,
          base: undefined,
          type: undefined,
        };
      }
    }
    return {
      valid_dir: true,
      base: "packages",
      type: "service",
    };
  }