import * as nedb from 'nedb';
import { TLayers } from '../utils/types';


export interface IDbClient {
    db: nedb
}


// export type TRun =  (sql: string, params?: any[] | Record<string, unknown> ) => Promise<TRan>;


export interface IAdd {
    packageName: string;
    version?: string;
    dev: boolean;
    layer: TLayers;
}

export interface IPackage extends IAdd {
    id: string;
}