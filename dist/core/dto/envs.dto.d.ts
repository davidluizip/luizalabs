declare class AWSCredentials {
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
}
export declare class SQSDTO {
    url: string;
    queue_name: string;
    isFifo: boolean;
}
export declare class AWSDTO {
    credendials: AWSCredentials;
    sqs: SQSDTO;
}
export declare class CACHEDTO {
    product_ttl: number;
}
export declare class JWTDTO {
    secret: string;
}
export declare class SALESFORCEDTO {
    url: string;
    crmUrl: string;
    clientId: string;
    secret: string;
    user: string;
    pass: string;
}
export declare class APIDTO {
    port: number;
    host: string;
    jwt: JWTDTO;
}
export {};
