import { IsNumber, IsString } from 'class-validator';

export class UsersEntity {
  @IsNumber()
  userId: number;

  @IsString()
  username: string;

  @IsString()
  password: string;
}
