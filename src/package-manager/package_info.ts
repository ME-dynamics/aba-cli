import { read_package_json } from "../utils";
import { db } from "../db";
import { i_package_info } from "../types";

export async function package_info(args: i_package_info) {
  const { argv, dev, layer, mode } = args;
  const pkg_json = read_package_json();
  const database = await db(pkg_json.name);
  for (let index = 0; index < argv.length; index++) {
    const packages = dev
      ? Object.keys(pkg_json.devDependencies)
      : Object.keys(pkg_json.dependencies);
    const package_name = argv[index];
    if (packages.includes(package_name)) {
      const version = dev
        ? pkg_json.devDependencies[package_name]
        : pkg_json.dependencies[package_name];
      mode === "add"
        ? await database.add({ package_name, dev, layer, version })
        : await database.remove({ package_name });
    } else {
      throw new Error(
        `there was a problem in ${
          mode === "add" ? "installing" : "finding"
        } package: ${package_name}`
      );
    }
  }
}
