import { createHash } from "crypto";
import { i_db_client, i_add, i_package } from "../types";

export function build_add(args: i_db_client) {
  const { db } = args;
  return function add(info: i_add): Promise<i_package> {
    return new Promise((resolve, reject) => {
      const { dev, layer, package_name, version } = info;
      const sha1 = createHash("sha1");
      const id = sha1.update(package_name).digest("hex");
      const doc = {
        _id: id,
        package_name,
        version,
        dev,
        layer,
      };
      db.insert(doc, (err, newDoc) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            id: newDoc._id,
            package_name: newDoc.package_name,
            version: newDoc.version,
            dev: newDoc.dev,
            layer: newDoc.layer,
          });
        }
      });
    });
  };
}
