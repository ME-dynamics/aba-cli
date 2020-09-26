import { prompt } from "inquirer";
import { readJSONSync, writeJSONSync } from "fs-extra";
import { join } from "path";

export async function updatePackageJson(name: string, libTitle: string) {
  const rootPath = process.cwd();
  const path = join(rootPath, name);
  const answers = await prompt([
    {
      name: "repo",
      message: "please enter this project git repository url in http form",

    },
    {
      name: "protocol",
      message: "do you use SSH or HTTP?",
      type: "list",
      choices: ["SSH", "HTTP"],
    },
    {
      name: "author",
      message: "who is the author of this project?",
      
    }
  ]);
  const packageJsonPath = join(path, "package.json");
  let pJson: any;
  try {
    pJson = readJSONSync(packageJsonPath);
  } catch (error) {
    throw new Error(`error in reading json, info: ${error}`);
  }
  const { repo, protocol, author } = answers;
  pJson.repository = repo;
  pJson.name = name;
  pJson.description = `${libTitle}: ${name}`;
  pJson.author = author;
  try {
    writeJSONSync(packageJsonPath, pJson, { spaces: 2 });
  } catch (error) {
    throw new Error(`error in writing json, info: ${error}`);
  }
}

