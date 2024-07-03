import { Type } from 'class-transformer';
import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { RoleEntity } from './role.entity';

export class UsersEntity {
  @IsNumber()
  userId: number;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @ValidateNested({ each: true })
  @Type(() => RoleEntity)
  role: RoleEntity;
}
