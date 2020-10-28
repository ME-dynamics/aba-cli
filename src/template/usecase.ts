
export function usecase_layer(name: string) {

  const usecase_file = `// import { } from "../entities";
      // import { http_result ,result, error_factory, i_result} from "aba-utils";
      // import { } from "../types";
  
      export function build_${name.toLowerCase()} (args: any) {
          // FIXME: write your interface for args
          return async function ${name.toLowerCase()} (info: any) {
              // FIXME: change value to needed arguments with interface
              // FIXME: create function return interface in Promise -> i_result or i_http_result -> your interface
  
              // TODO: write the use case
              // TODO: use result function to return anything
              // INFO: try catch error only for malfunctioning errors
              // INFO: use http status codes lib
          };
      }`;
  return usecase_file;
  
}
