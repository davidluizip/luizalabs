import { Type } from 'class-transformer';
import { IsNumber, IsString, ValidateNested } from 'class-validator';

class AWSCredentials {
  @IsString()
  accessKeyId: string;

  @IsString()
  secretAccessKey: string;

  @IsString()
  region: string;
}

export class SQSDTO {
  url: string;
  queue_name: string;
  isFifo: boolean;
}

export class AWSDTO {
  credendials: AWSCredentials;
  sqs: SQSDTO;
}

export class CACHEDTO {
  @IsNumber()
  product_ttl: number;
}
export class JWTDTO {
  @IsString()
  secret: string;
}

export class SALESFORCEDTO {
  @IsString()
  url: string;

  @IsString()
  crmUrl: string;

  @IsString()
  clientId: string;

  @IsString()
  secret: string;

  @IsString()
  user: string;

  @IsString()
  pass: string;
}

export class APIDTO {
  @IsNumber()
  port: number;

  @IsString()
  host: string;

  @ValidateNested({ each: true })
  @Type(() => JWTDTO)
  jwt: JWTDTO;
}
