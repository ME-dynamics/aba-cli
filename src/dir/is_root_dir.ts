import { i_valid_directory, t_libraries } from "../types";

export function is_root_dir(
  fileList: string[],
  mode: t_libraries
): i_valid_directory {
  const shared_file_names = {
    package_json: "package.json",
    docs: "docs",
    benchmarks: "benchmarks",
    tests: "__tests__",
    eslint: ".eslintrc.js",
    jest: "jest.config.js",
    ts: "tsconfig.json",
  };
  const nca_file_names = {
    packages: "packages",
  };
  const nodelib_file_names = {
    src: "src",
  };
  // TODO: support RRN

  if (
    fileList.includes(shared_file_names.package_json) &&
    fileList.includes(shared_file_names.docs) &&
    fileList.includes(shared_file_names.eslint) &&
    fileList.includes(shared_file_names.benchmarks) &&
    fileList.includes(shared_file_names.tests)
  ) {
    if (mode === "service" && fileList.includes(nca_file_names.packages)) {
      return {
        valid_dir: true,
        base: "root",
        type: "service",
      };
    } else if (mode === "nodelib" && fileList.includes(nodelib_file_names.src)) {
      return {
        valid_dir: true,
        base: "root",
        type: "nodelib",
      };
    } else {
      return {
        valid_dir: false,
        base: undefined,
        type: undefined,
      };
    }
  } else {
    return {
      valid_dir: false,
      base: undefined,
      type: undefined,
    };
  }
}
