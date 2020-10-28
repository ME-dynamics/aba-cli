import { createHash } from "crypto";
import { i_db_client,  i_remove} from "../types";

export function build_remove(args: i_db_client) {
  const { db } = args;
  return function remove(info: i_remove): Promise<number> {
    return new Promise((resolve, reject) => {
      const {  package_name } = info;
      const sha1 = createHash("sha1");
      const id = sha1.update(package_name).digest("hex");
      const doc = {
        _id: id,
      };
      db.remove(doc, (err, num) => {
        if (err) {
          reject(err);
        } else {
          resolve(num);
        }
      });
    });
  };
}
