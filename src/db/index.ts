import { Database } from "sqlite3";
import { isValidDirectory } from "../dir";
import { switchToRoot } from "../utils";

import { buildRun } from "./utils";
import { buildInitDb } from "./initDb";
import { buildAdd } from "./add";

export async function db(serviceName: string) {
//   switchToRoot();
  const db = new Database(`./${serviceName}Db`);
  const run = buildRun({ db });
  const initDb = buildInitDb({ run });
  const add = buildAdd({ run });
  await initDb();
  return {
      add
  }
}



// (async () => {
//     const actions = await db("user");
//     actions.add({
//         dev: true,
//         layer: "entities",
//         packageName: "erfan",
//         version: "1.0.1"
//     })
// })()