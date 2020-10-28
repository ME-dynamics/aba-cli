
export function interface_layer(controller: string, usecase: string ) {
    return `import { ${controller} } from "../controllers";
    import { i_request, i_reply } from "../types";
    export async function ${usecase.toLowerCase()}(request: i_request, reply: i_reply){
        try {
            const response = await ${controller}(request);
            // TODO: set status code, return response
        } catch(error) {
            // TODO: set status code, return response
        }
    }`
}