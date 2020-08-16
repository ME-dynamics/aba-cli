import { TRan, IDbClient } from '../types';





export function buildRun(args: IDbClient) {
    const { db } = args;
    return function run(sql: string, params?: any[] | Record<string, unknown> ): Promise<TRan> {
        return new Promise((resolve, reject) => {
            db.run(sql, params, (result: TRan, err: Error | null) => {
                if(err) reject(err);
                resolve(result);
            })
        })
        
    }
}