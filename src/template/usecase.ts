import { firstLetterUpperCase } from "../utils";

export function usecaseLayer(name: string) {
  const upperName = firstLetterUpperCase(name);

  const usecaseFile = `// import { } from "../entities";
      // import { httpResult ,result, ErrorFactory, IResult} from "aba-utils";
      // import { } from "../types";
  
      export function build${upperName} (args: any) {
          // FIXME: write your interface for args
          return async function ${name} (info: any) {
              // FIXME: change value to needed arguments with interface
              // FIXME: create function return interface in Promise -> IResult or IHttpResult -> your interface
  
              // TODO: write the use case
              // TODO: use result function to return anything
              // INFO: try catch error only for malfunctioning errors
              // INFO: use http status codes lib
          };
      }`;
  return usecaseFile;
  
}
