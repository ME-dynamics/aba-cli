import { readJSONSync, writeJSONSync, existsSync } from "fs-extra";
import {
  IJsonDB,
  TLayers,
  ISetPackage,
  TPackageManager,
  IPackageExists,
} from "./types";
import { isValidDirectory } from "./isValidDirectory";
import { join } from "path";

function switchToRoot(): void {
  const validDir = isValidDirectory();
  // check if project is valid
  if (!validDir.isValid) throw new Error("not in nca project");

  // if base is in root, no need to change directory
  if (validDir.base === "root") return;

  const currentPath = process.cwd();
  // if base is in packages, should go one level up
  if (validDir.base === "packages") {
    const upDir = join(currentPath, "..");
    process.chdir(upDir);
    return;
  }

  // if base is into project folder tree, should go up
  // until it reaches root base
  if (validDir.base === "downTheRoad") {
    let upDir: string = currentPath;
    // 3, because three level of structure is allowed from root base
    for (let index = 0; index < 3; index++) {
      upDir = join(upDir, "..");
      process.chdir(upDir);
      if (isValidDirectory().base === "root") {
        return;
      }
    }
  }
}

// remove package from db layer
function remove(db: IJsonDB, packageName: string, layer: TLayers) {
  const filter = (item: string) => {
    return item !== packageName;
  };
  if (db[layer].includes(packageName)) {
    db[layer] = db[layer].filter(filter);
    write(db);
  } else {
    throw new Error(`${packageName} does not exist in layer ${layer}`);
  }
}

// read nce json and returns it as an object

function read(): IJsonDB {
  try {
    const db: IJsonDB = readJSONSync("nca.json");
    return db;
  } catch (error) {
    throw error;
  }
}

// write db object to nca json
function write(db: IJsonDB) {
  try {
    writeJSONSync("nca.json", db, { spaces: 2 });
  } catch (error) {
    throw error;
  }
}

// check if nca json exists, or will create it
function checkDB(): IJsonDB {
  const exists = existsSync("nca.json");
  if (exists) {
    try {
      return read();
    } catch (error) {
      throw error;
    }
  } else {
    const initDb: IJsonDB = {
      packageManager: "yarn",
      entities: [],
      usecase: [],
      controllers: [],
      interface: [],
      infra: [],
      global: [],
    };
    try {
      write(initDb);
      return initDb;
    } catch (error) {
      throw error;
    }
  }
}

function packageExistsInDb(db: IJsonDB, packageName: string): IPackageExists {
  const found: TLayers[] = [];
  // check if package exists in db

  // TODO: using an iterable as db object
  // const dbKeys: string[] = Object.keys(db);
  // for (let index = 0; index < dbKeys.length; index++) {
  //   const key = dbKeys[index];
  //   if(packageName in db[key]) found.push(key);
  // }

  if (db.entities.includes(packageName)) found.push("entities");

  if (db.usecase.includes(packageName)) found.push("usecase");

  if (db.controllers.includes(packageName)) found.push("controllers");

  if (db.interface.includes(packageName)) found.push("interface");

  if (db.infra.includes(packageName)) found.push("infra");

  if (db.global.includes(packageName)) found.push("global");
  // console.log(packageName);
  // console.log(packageName in db.entities);
  if (found.length === 0) {
    return {
      status: false,
    };
  } else if (found.length === 1) {
    return {
      status: true,
      layer: found[0],
    };
  } else {
    throw new Error(`PANIC, conflict between packages in ${found.toString()}`);
  }
}

function setPackage(
  db: IJsonDB,
  layer: TLayers,
  packageName: string
): ISetPackage {
  let exists: IPackageExists;
  try {
    exists = packageExistsInDb(db, packageName);
  } catch (error) {
    throw error;
  }

  // check result
  if (!exists.status) {
    db[layer].push(packageName);
    try {
      write(db);
      return {
        status: "added",
        error: undefined,
      };
    } catch (error) {
      throw error;
    }
  }
  // check if it's installed or conflict
  if (exists.status && exists.layer !== layer) {
    return {
      status: "conflict",
      error: `you have conflict in ${exists.layer}`,
    };
  } else {
    return {
      status: "alreadyInstalled",
      error: undefined,
    };
  }
}

// set package manager of choice
function setPackageManager(db: IJsonDB, packageManager: "npm" | "yarn") {
  db.packageManager = packageManager;
  try {
    write(db);
  } catch (error) {
    throw error;
  }
}

// json db manager
export function jsonDB() {
  // first switch to root,
  try {
    switchToRoot();
  } catch (error) {
    throw error;
  }

  const db = checkDB();
  return Object.freeze({
    get: {
      packageManager: () => db.packageManager,
      entities: () => db.entities,
      usecase: () => db.usecase,
      controllers: () => db.controllers,
      interface: () => db.interface,
      infra: () => db.infra,
      global: () => db.global,
      packageExists: (packageName: string) =>
        packageExistsInDb(db, packageName),
    },
    set: {
      packageManager: (packageManager: TPackageManager) =>
        setPackageManager(db, packageManager),
      entities: (packageName: string): ISetPackage =>
        setPackage(db, "entities", packageName),
      usecase: (packageName: string): ISetPackage =>
        setPackage(db, "usecase", packageName),
      controllers: (packageName: string): ISetPackage =>
        setPackage(db, "controllers", packageName),
      interface: (packageName: string): ISetPackage =>
        setPackage(db, "interface", packageName),
      infra: (packageName: string): ISetPackage =>
        setPackage(db, "infra", packageName),
      global: (packageName: string): ISetPackage =>
        setPackage(db, "global", packageName),
    },
    remove: (packageName: string, layer: TLayers) => remove(db, packageName, layer)
  });
}
