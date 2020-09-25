export interface IError {
  err: string | Error;
  errCode?: string;
}
export type TError = (args: IError) => void;

export interface ILog {
  message: string;
}
export type TLog = (args: ILog) => void;

export type TLibraries = "service" | "nodelib" | "rrn";

export interface ICreateLib {
  name: string;
  mode: TLibraries;
}
export type TCreateLayers = "entity" | "usecase" | "adapter" | "schema";
export interface ICreateLayer {
    mode: TCreateLayers;
    name: string;
    httpVerb?: THttpVerbs
    
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
