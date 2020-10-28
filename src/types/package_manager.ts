export type t_layers =
  | "entities"
  | "usecases"
  | "controllers"
  | "interfaces"
  | "adapters"
  | "schemas"
  | "global"
  | "dev"
  | "none";

export interface i_set_package {
  status: "already_installed" | "added" | "conflict";
  error?: string;
}

export interface i_package_mode {
  mode: "install" | "add_package" | "remove";
  package_name?: string;
}

export interface i_package_info {
  argv: string[];
  dev: boolean;
  layer: t_layers;
  mode: "add" | "remove";
}
