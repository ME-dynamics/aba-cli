import { IBuildInitDb } from "../types";



export function buildInitDb(args: IBuildInitDb) {
    const { run } = args;
    
    return async function initDb() {
        const query = `create table if not exists packages (
            id text primary key,
            name text,
            version text,
            dev integer,
            layer text
        )`;
        try {
            const res = await run(query);    
        } catch (error) {
            throw new Error(`failed to initiate db`);
        }
        
         
    }
}

