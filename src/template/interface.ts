export function interface_layer(controller: string, usecase: string ) {
    return `import { ${controller} } from "../controllers";
    import { types } from "aba-utils";
    export async function ${usecase.toLowerCase()}(request: types.t_request, reply: types.t_reply){
        try {
            const response = await ${controller}(request);
            reply.status(response.code);
            reply.send(response);
        } catch(error) {
            reply.status(error.code);
            reply.send(error);
        }
    }`
}