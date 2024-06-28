import { IsEnum } from 'class-validator';
import { EMicroName } from '../enums/micro-name.enum';

export class ParamsTokenDevDTO {
  @IsEnum(EMicroName)
  microName: EMicroName;
}
