import { THttpVerbs } from '../types';
import { firstLetterUpperCase } from '../utils';




export function controllerLayer(usecase: string, httpVerb: THttpVerbs) {
    const upperUsecase = firstLetterUpperCase(usecase);
    const controllerName = `${httpVerb.toUpperCase()}${upperUsecase}`;
    const controllerFile = `import { IRequest } from "../types"
      import { ${usecase.toLowerCase()} } from "../usecases"
      export function build${controllerName}(){
          // TODO: inject any tool that's needed, like request cache
          return async function ${controllerName}(httpRequest: IRequest) {
              // TODO: extract data const { body, ...} = httpRequest;
              // TODO: do controller logic, like jwt, cache, some rules, validate maybe
              // TODO: call use case with parameters and return results
          }
      }`;
    return {
      controllerName,
      controllerFile,
    };
  }