export type TLayers =
  | "entities"
  | "usecases"
  | "controllers"
  | "interfaces"
  | "adapters"
  | "schemas"
  | "global"
  | "dev"
  | "none";

export interface ISetPackage {
  status: "alreadyInstalled" | "added" | "conflict";
  error?: string;
}

export interface IPackageMode {
  mode: "install" | "addPackage" | "remove";
  packageName?: string;
}

export interface IPackageInfo {
  argv: string[];
  dev: boolean;
  layer: TLayers;
  mode: "add" | "remove";
}
