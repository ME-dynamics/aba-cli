import { readPackageJson } from "../utils";
import { db } from "../db";
import { IPackageInfo } from "../types";

export async function packageInfo(args: IPackageInfo) {
  const { argv, dev, layer, mode } = args;
  const pkgJson = readPackageJson();
  const database = await db(pkgJson.name);
  for (let index = 0; index < argv.length; index++) {
    const packages = dev
      ? Object.keys(pkgJson.devDependencies)
      : Object.keys(pkgJson.dependencies);
    const packageName = argv[index];
    if (packages.includes(packageName)) {
      const version = dev
        ? pkgJson.devDependencies[packageName]
        : pkgJson.dependencies[packageName];
      mode === "add"
        ? await database.add({ packageName, dev, layer, version })
        : await database.remove({ packageName });
    } else {
      throw new Error(
        `there was a problem in ${
          mode === "add" ? "installing" : "finding"
        } package: ${packageName}`
      );
    }
  }
}
