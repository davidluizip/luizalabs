import { Result } from '@base/results-api.base';
import { UsersService } from '@modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
export interface IAuthRequest {
    username: string;
    password: string;
}
export interface IAuthResponse {
    access_token: string;
}
export declare class AutenticateService {
    private readonly usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    signIn({ username, password, }: IAuthRequest): Promise<Result<IAuthResponse>>;
}
