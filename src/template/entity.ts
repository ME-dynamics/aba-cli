
export function entity_layer(name: string) {
  const lower_name = name.toLowerCase();
  return `// import {} from "../types";
  export function build_make_${lower_name}(args: any) {
          // FIXME: write your interface for args
          return function make_${lower_name}(${lower_name}: any) {
              // FIXME: write your interface for ${lower_name}
              // TODO: extract Data: const / let {item1, item2, ...} = ${name};
  
              // TODO: write business rules
  
              const made_${lower_name}: any = {
                  get: {},
                  set: {},
                  action: {}
              };
              // FIXME: interface for made_${lower_name}
  
              return Object.freeze(made_${lower_name});
          };
      };`;
}
