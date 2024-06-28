export interface IUserResponse {
    authorities: string[];
    details: null;
    authenticated: boolean;
    principal: IUserSessionBase;
    credentials: null;
    name: string;
}
export interface IUserSessionBFF {
    userClient: {
        email: string;
        name: string;
        type: string;
        status: string;
        externalId: string;
        userId: number;
        sellerExternalS4Id: string;
        superUser: boolean;
        superCoordinator: boolean;
        externalIds: string[];
    };
    microName: string;
    correlationId: string;
    roles: {
        id: number;
        name: string;
        is_admin: boolean;
    };
}
export interface IUserSessionBase {
    email: string;
    name: string;
    type: string;
    externalId: string;
    userId: number;
    sellerExternalS4Id: string;
    superUser: boolean;
    superCoordinator: boolean;
    externalIds: string[];
}
