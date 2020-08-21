import { THttpVerbs } from "../types";

function firstLetterUpperCase(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function entityLayer(name: string) {
  const upperName = firstLetterUpperCase(name);
  return `export function buildMake${upperName}(args: any) {
        // FIXME: write your interface for args
        return function make${upperName}(${name}: any) {
            // FIXME: write your interface for ${name}
            // TODO: extract Data: const / let {item1, item2, ...} = ${name};

            // TODO: write business rules

            const made${upperName}: any = {
                get: {},
                set: {},
                action: {}
            };
            // FIXME: interface for made${upperName}

            return Object.freeze(made${upperName});
        };
    } `;
}

export function usecaseLayer(name: string) {
  const usecaseName = firstLetterUpperCase(name);

  const usecaseFile =  `// import { } from "../entities";
    import {result, errorFactory, IResult} from "aba-utils";
    // import { } from "../types";

    export function build${usecaseName} (args: any) {
        // FIXME: write your interface for args
        return async function ${name} (value: any): Promise<IResult<any>> {
            // FIXME: change value to needed arguments with interface
            // FIXME: create function return interface in Promise -> IResult -> your interface

            // TODO: write the use case
            // TODO: use result function to return anything
            // INFO: try catch error only for malfunctioning errors
            // INFO: if things doesn't work out logically, use result's success: false
        };
    }`;
    return {
        usecaseName,
        usecaseFile
    }
}

export function controllerLayer(usecase: string, httpVerb: THttpVerbs) {
  
  const controllerName = `${httpVerb}${usecase}`;
  const controllerFile = `import { IRequest } from "../types"
    import { ${usecase} } from "../usecases"
    export function build${controllerName}(){
        // TODO: inject any tool that's needed, like request cache
        return async function ${controllerName}(httpRequest: IRequest) {
            // TODO: extract data const { body, ...} = httpRequest;
            // TODO: do controller logic, like cache, some rules, validate maybe
            // TODO: call use case with parameters and return results
        }
    }`;
  return {
    controllerName,
    controllerFile,
  };
}

export function interfaceLayer(controller: string, usecase: string ) {
    return `import { ${controller} } from "../controllers";
    import { IRequest, IReply } from "../types";
    export async function ${usecase}(request: IRequest, reply: IReply){
        try {
            const response = await ${controller}(request);
            // TODO: set status code, return response
        } catch(error) {
            // TODO: set status code, return response
        }
    }`
}
