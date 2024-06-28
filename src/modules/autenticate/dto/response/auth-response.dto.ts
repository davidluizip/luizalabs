import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDTO {
  @ApiProperty({
    type: String,
    description: 'Access token',
    required: false,
  })
  access_token: string;
}
