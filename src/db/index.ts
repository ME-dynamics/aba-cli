import nedb from "nedb";

import { switch_to_root } from "../utils";

import { build_add } from "./add";
import { build_remove } from "./remove";
import { build_find_by_id } from "./find_by_id";

export async function db(serviceName: string) {
  switch_to_root();

  const db = new nedb({
    filename: `./${serviceName}Db`,
    autoload: true,
    timestampData: true,
  });
  const add = build_add({ db });
  const findById = build_find_by_id({ db });
  const remove = build_remove({ db });
  return {
    add,
    findById,
    remove,
  };
}
