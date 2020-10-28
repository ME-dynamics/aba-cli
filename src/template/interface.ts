
export function interface_layer(controller: string, usecase: string ) {
    return `import { ${controller} } from "../controllers";
    import { t_request, t_reply } from "../types";
    export async function ${usecase.toLowerCase()}(request: t_request, reply: t_reply){
        try {
            const response = await ${controller}(request);
            // TODO: set status code, return response
        } catch(error) {
            // TODO: set status code, return response
        }
    }`
}