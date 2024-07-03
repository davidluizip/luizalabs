import { Result } from '@base/results-api.base';
import { Roles } from '@decorators/roles.decorator';
import { ProfileUserEnum } from '@enums/profile-user.enum';
import { Limit, LimitGuard } from '@guard/limit-body.guard';
import { RolesGuard } from '@guard/roles.guard';
import { JwtAuthGuard } from '@modules/autenticate/guards/jwt.guard';
import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiSecurity,
} from '@nestjs/swagger';
import multerConfig from './multer/multer-config';

@ApiSecurity('bearer')
@Controller('import-files')
export class ImportFilesController {
  constructor(private eventEmitter: EventEmitter2) {}

  @Post()
  @UseGuards(LimitGuard, JwtAuthGuard, RolesGuard)
  @Roles(ProfileUserEnum.PUBLIC)
  @Limit(10 * 1024 * 1024 * 1.1) // recebendo payload de 1.17mb e com uma margem de 10% de 1.1
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Realiza a importação do arquivo' })
  @UseInterceptors(FileInterceptor('arquivo', multerConfig))
  async importFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('Arquivo não recebido');
    }

    this.eventEmitter.emit('import.file', { filePath: file.path });

    return Result.Ok({
      data: `${file?.fieldname} Arquivo recebido com sucesso`,
    });
  }
}
