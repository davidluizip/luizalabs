import { Result } from '@base/results-api.base';
import { UsersService } from '@modules/users/users.service';
import { ValidateBuilder } from '@modules/users/validate/validate-builder';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { APIMESSAGE } from '@shared/services/api-message.helpers';

export interface IAuthRequest {
  username: string;
  password: string;
}

export interface IAuthResponse {
  access_token: string;
}

/**
 * Serviço responsável pela autenticação de usuários.
 */
@Injectable()
export class AutenticateService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Realiza o processo de autenticação para um usuário.
   *
   * @async
   * @param {IAuthRequest} param0 - Dados de entrada contendo nome de usuário e senha.
   * @returns {Promise<Result<IAuthResponse>>} Resultado da operação contendo um token de acesso em caso de sucesso.
   */
  async signIn({
    username,
    password,
  }: IAuthRequest): Promise<Result<IAuthResponse>> {
    try {
      const user = await this.usersService.findOne(username);

      ValidateBuilder.setEntity(user)
        .userName(username)
        .password(password)
        .build();

      const payload = {
        sub: user.userId,
        username: user.username,
        role: user.role,
      };

      const access_token = await this.jwtService.signAsync(payload);

      return Result.Ok<any>({
        data: { access_token },
        meta: null,
      });
    } catch (error: any) {
      let message = APIMESSAGE.JWTERROR();

      if (error?.message && typeof APIMESSAGE[error.message] === 'function') {
        message = APIMESSAGE[error.message]();
      }
      return Result.Fail(`AutenticateService-signIn`, message, 500);
    }
  }
}
