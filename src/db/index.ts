import nedb from "nedb";

import { switchToRoot } from "../utils";

import { buildAdd } from "./add";
import { buildRemove } from "./remove";
import { buildFindById } from "./findById";

export async function db(serviceName: string) {
  switchToRoot();

  const db = new nedb({
    filename: `./${serviceName}Db`,
    autoload: true,
    timestampData: true,
  });
  const add = buildAdd({ db });
  const findById = buildFindById({ db });
  const remove = buildRemove({ db });
  return {
    add,
    findById,
    remove,
  };
}
