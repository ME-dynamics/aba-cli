import { TLayers, ISetPackage } from "./types";
import { jsonDB } from "./jsonDB";
import { packageCommand } from "./packageCommand";

export async function addPackage(layer: TLayers | "dev", packageName: string): Promise<ISetPackage> {
  const db = jsonDB();
  let result: ISetPackage;
  if (layer === "entities") {
    result = db.set.entities(packageName);
  } else if (layer === "usecase") {
    result = db.set.usecase(packageName);
  } else if (layer === "controllers") {
    result = db.set.controllers(packageName);
  } else if (layer === "interface") {
    result = db.set.interface(packageName);
  } else if (layer === "infra") {
    result = db.set.infra(packageName);
  } else if (layer === "global") {
    result = db.set.global(packageName);
  } else if (layer === "dev") {
    // TODO: add dev packages to database
    result = {status: 'added'};
  } else {
    throw new Error(`invalid layer, ${layer} does not exist`);
  }
  if(result.status === "conflict") {
    return result;
  }
  if (result.status === "alreadyInstalled") {
    return result;
  } else {
    try {
      await packageCommand({mode: "addPackage",packageManager: db.get.packageManager(), packageName });
      return {
        status: "added",
      }  
    } catch (error) {
      throw error;
    }
    
    
  }
}
