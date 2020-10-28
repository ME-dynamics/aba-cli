
export type t_libraries = "service" | "nodelib" | "rrn";

export interface i_create_lib {
  name: string;
  mode: t_libraries;
}

export type t_create_layers = "entities" | "usecases" | "adapters" | "schemas";
export interface i_create_layer {
    mode: t_create_layers;
    name: string;
    
}

export type t_http_verbs =
  | "GET"
  | "HEAD"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "OPTIONS"
  | "CONNECT"
  | "TRACE";
