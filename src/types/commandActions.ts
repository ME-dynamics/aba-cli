
export type TLibraries = "service" | "nodelib" | "rrn";

export interface ICreateLib {
  name: string;
  mode: TLibraries;
}

export type TCreateLayers = "entities" | "usecases" | "adapters" | "schemas";
export interface ICreateLayer {
    mode: TCreateLayers;
    name: string;
    
}

export type THttpVerbs =
  | "GET"
  | "HEAD"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "OPTIONS"
  | "CONNECT"
  | "TRACE";
