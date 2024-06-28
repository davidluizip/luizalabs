import { ApiProperty } from '@nestjs/swagger';

export class SignInRequestDTO {
  @ApiProperty({
    type: String,
    description: 'Username',
    required: true,
  })
  username: string;

  @ApiProperty({
    type: String,
    description: 'Password',
    required: true,
  })
  password: string;
}
