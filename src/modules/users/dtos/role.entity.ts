import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class RoleEntity {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsBoolean()
  is_admin: boolean;
}
