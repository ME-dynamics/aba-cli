import { createHash } from "crypto";
import { IDbClient,  IRemove} from "../types";

export function buildRemove(args: IDbClient) {
  const { db } = args;
  return function remove(info: IRemove): Promise<number> {
    return new Promise((resolve, reject) => {
      const {  packageName } = info;
      const sha1 = createHash("sha1");
      const id = sha1.update(packageName).digest("hex");
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
