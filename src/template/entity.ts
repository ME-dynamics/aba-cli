import { firstLetterUpperCase } from "../utils";

export function entityLayer(name: string) {
  const upperName = firstLetterUpperCase(name);
  return `// import {} from "../types";
  export function buildMake${upperName}(args: any) {
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
