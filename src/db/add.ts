import { createHash } from "crypto";
import { IDbClient, IAdd, IPackage } from "../types";

export function buildAdd(args: IDbClient) {
  const { db } = args;
  return function add(info: IAdd): Promise<IPackage> {
    return new Promise((resolve, reject) => {
      const { dev, layer, packageName, version } = info;
      const sha1 = createHash("sha1");
      const id = sha1.update(packageName).digest("hex");
      const doc = {
        _id: id,
        packageName,
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
            packageName: newDoc.packageName,
            version: newDoc.version,
            dev: newDoc.dev,
            layer: newDoc.layer,
          });
        }
      });
    });
  };
}
