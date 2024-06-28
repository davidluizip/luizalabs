export declare class HealthCheckDTO {
    status: string;
    message: string;
    info: {
        database: {
            status: string;
        };
    };
    error: any;
    details: {
        database: {
            status: string;
        };
    };
}
