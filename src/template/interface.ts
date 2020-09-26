
export function interfaceLayer(controller: string, usecase: string ) {
    return `import { ${controller} } from "../controllers";
    import { IRequest, IReply } from "../types";
    export async function ${usecase.toLowerCase()}(request: IRequest, reply: IReply){
        try {
            const response = await ${controller}(request);
            // TODO: set status code, return response
        } catch(error) {
            // TODO: set status code, return response
        }
    }`
}