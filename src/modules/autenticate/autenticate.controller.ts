import { Result } from '@base/results-api.base';
import {
  SwaggerErrorResponse,
  WithBasePostPutResponse,
} from '@dto/swagger/swagger.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AutenticateService, IAuthResponse } from './autenticate.service';
import { SignInRequestDTO } from './dto/request/signin.request.dto';
import { AuthResponseDTO } from './dto/response/auth-response.dto';

@Controller()
@ApiTags('Autenticate')
export class AutenticateController {
  constructor(private readonly autenticateService: AutenticateService) {}

  @Post('sign-in')
  @ApiResponse({
    status: 200,
    type: WithBasePostPutResponse(AuthResponseDTO),
  })
  @ApiResponse({
    status: 400,
    type: SwaggerErrorResponse,
  })
  signIn(
    @Body() { username, password }: SignInRequestDTO,
  ): Promise<Result<IAuthResponse>> {
    return this.autenticateService.signIn({ username, password });
  }
}
