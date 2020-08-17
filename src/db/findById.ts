import { IDbClient, IPackage } from "../types";

export function buildFindById(args: IDbClient) {
  const { db } = args;
  return function findById(id: string): Promise<IPackage> {
    return new Promise((resolve, reject) => {
      db.findOne({ _id: id }, (err, document) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            id: document._id,
            packageName: document.packageName,
            version: document.version,
            dev: document.dev,
            layer: document.layer,
          });
        }
      });
    });
  };
}
