import nedb from 'nedb';
import { t_layers } from './package_manager';


export interface i_db_client {
    db: nedb
}


// export type TRun =  (sql: string, params?: any[] | Record<string, unknown> ) => Promise<TRan>;


export interface i_add {
    package_name: string;
    version?: string;
    dev: boolean;
    layer: t_layers;
}

export interface i_package extends i_add {
    id: string;
}


export interface i_remove {
    package_name: string;
}