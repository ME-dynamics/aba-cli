import { t_http_verbs } from "../types";
export function controller_layer(usecase: string, http_verb: t_http_verbs) {
  const controller_name = `${http_verb.toLowerCase()}_${usecase.toLowerCase()}`;
  const controller_file = `import { types } from "aba-utils";
      import { ${usecase.toLowerCase()} } from "../usecases";
      export function build_${controller_name}(){
          // TODO: inject any tool that's needed, like request cache
          return async function ${controller_name}(http_request: types.t_request) {
              // TODO: extract data const { body, ...} = http_request;
              // TODO: do controller logic, like jwt, cache, some rules, validate maybe
              // TODO: call use case with parameters and return results
          };
      }`;
  return {
    controller_name,
    controller_file,
  };
}
