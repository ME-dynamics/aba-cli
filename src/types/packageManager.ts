export type TLayers =
  | "entities"
  | "usecases"
  | "controllers"
  | "interfaces"
  | "adapters"
  | "schemas"
  | "global"
  | "dev";

  export interface ISetPackage {
    status: "alreadyInstalled" | "added" | "conflict";
    error?: string;
  }
  


  export interface IPackageMode {
    mode: "install" | "addPackage"| "remove";
    packageName?: string;
    
  }