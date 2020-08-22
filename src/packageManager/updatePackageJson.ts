import { cli } from "cli-ux";
import { readJSONSync, writeJSONSync } from "fs-extra";
import { join } from "path";

export async function updatePackageJson(name: string, libTitle: string) {
  const rootPath = process.cwd();
  const path = join(rootPath, name);
  const repo = await cli.prompt("project git repository");
  // TODO: put some validation for url;
  const author = await cli.prompt("project's author name", { required: true });
  const packageJsonPath = join(path, "package.json");
  let pJson: any;
  try {
    pJson = readJSONSync(packageJsonPath);
  } catch (error) {
    throw new Error(`error in reading json, info: ${error}`);
  }

  if (repo) {
    pJson.repository = repo;
  } else {
    pJson.repository = "FILL ME";
  }
  pJson.name = name;
  pJson.description = `${libTitle}: ${name}`;
  pJson.author = author;
  try {
    writeJSONSync(packageJsonPath, pJson, { spaces: 2 });
  } catch (error) {
    throw new Error(`error in writing json, info: ${error}`);
  }
}
