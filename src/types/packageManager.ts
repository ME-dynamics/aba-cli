export type TLayers =
  | "entities"
  | "usecase"
  | "controllers"
  | "interface"
  | "infra"
  | "global";

  export interface ISetPackage {
    status: "alreadyInstalled" | "added" | "conflict";
    error?: string;
  }
  