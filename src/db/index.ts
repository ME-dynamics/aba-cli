import * as nedb from "nedb";

import { switchToRoot } from "../utils";

import { buildAdd } from "./add";
import { buildFindById } from "./findById";

export async function db(serviceName: string) {
  //   switchToRoot();
  // TODO: switch to root directory on production cli
  const db = new nedb({ filename: `./${serviceName}Db`, autoload: true });

  const add = buildAdd({ db });
  const findById = buildFindById({ db });
  return {
    add,
    findById,
  };
}



// (async () => {
//   const actions = await db("user");
//   const inserted  = await actions.add({
//     dev: true,
//     layer: "entities",
//     packageName: "alireza",
//     version: "1.0.1",
//   });
//   console.log('inserted');
//   console.log(inserted)
//   const sha1 = createHash("sha1");
//   const id = sha1.update("alireza").digest("hex");
//   const found = await actions.findById(id);
//   console.log('found');
//   console.log(found)
 
// })();
