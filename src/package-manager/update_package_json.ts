import { prompt } from "inquirer";
import { readJSONSync, writeJSONSync } from "fs-extra";
import { join } from "path";
import { terminate_with_error } from '../utils';

export async function update_package_json(name: string, lib_title: string) {
  const root_path = process.cwd();
  const path = join(root_path, name);
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
  const package_json_path = join(path, "package.json");
  let p_json: any;
  try {
    p_json = readJSONSync(package_json_path);
  } catch (error) {
    throw new Error(`error in reading json, info: ${error}`);
  }
  const { repo, protocol, author } = answers;
  p_json.repository = repo;
  p_json.name = name;
  p_json.description = `${lib_title}: ${name}`;
  p_json.author = author;
  try {
    writeJSONSync(package_json_path, p_json, { spaces: 2 });
  } catch (error) {
    terminate_with_error(`error in writing json, info: ${error}`, error.exitCode);
  }
}

