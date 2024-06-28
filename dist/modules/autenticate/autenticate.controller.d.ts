import { Result } from '@base/results-api.base';
import { AutenticateService, IAuthResponse } from './autenticate.service';
import { SignInRequestDTO } from './dto/request/signin.request.dto';
export declare class AutenticateController {
    private readonly autenticateService;
    constructor(autenticateService: AutenticateService);
    signIn({ username, password }: SignInRequestDTO): Promise<Result<IAuthResponse>>;
}
