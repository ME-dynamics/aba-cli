import { i_db_client, i_package } from "../types";

export function build_find_by_id(args: i_db_client) {
  const { db } = args;
  return function find_by_id(id: string): Promise<i_package> {
    return new Promise((resolve, reject) => {
      db.findOne({ _id: id }, (err, document) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            id: document._id,
            package_name: document.package_name,
            version: document.version,
            dev: document.dev,
            layer: document.layer,
          });
        }
      });
    });
  };
}
