export type TLayers =
  | "entities"
  | "usecases"
  | "controllers"
  | "interfaces"
  | "adapters"
  | "schema"
  | "global"
  | "dev";

  export interface ISetPackage {
    status: "alreadyInstalled" | "added" | "conflict";
    error?: string;
  }
  


  export interface IParams {
    mode: "install" | "addPackage"| "remove";
    packageName?: string;
    
  }