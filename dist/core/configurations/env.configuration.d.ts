import { APIDTO, CACHEDTO, SALESFORCEDTO } from 'core/dto/envs.dto';
export declare const configuration: () => {
    NODE_ENV: string;
    api: {
        port: number;
        host: string;
        jwt: {
            secret: string;
        };
    };
    routes: {
        productsImports: {
            url: string;
            secret: string;
        };
    };
};
declare enum Environment {
    Local = "local",
    Development = "dev",
    Production = "prod",
    Test = "stg"
}
declare class EnvironmentVariables {
    api: APIDTO;
    cache: CACHEDTO;
    salesForce: SALESFORCEDTO;
    NODE_ENV: Environment;
}
export declare const validate: (config: Record<string, unknown>) => EnvironmentVariables;
export {};
