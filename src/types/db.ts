import { Database, RunResult } from 'sqlite3';
import { TLayers } from '../utils/types';

export type TRan = RunResult;

export interface IDbClient {
    db: Database
}


export type TRun =  (sql: string, params?: any[] | Record<string, unknown> ) => Promise<TRan>;

export interface IBuildInitDb {
    run: TRun;
    
}

export interface IBuildAdd {
    run: TRun;
}
export interface IAdd {
    packageName: string;
    version?: string;
    dev: boolean;
    layer: TLayers;
}