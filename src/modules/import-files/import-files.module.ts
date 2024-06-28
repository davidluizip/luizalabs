import { Module } from '@nestjs/common';
import { ImportFilesService } from './import-files.service';
import { ImportFilesController } from './import-files.controller';

@Module({
  controllers: [ImportFilesController],
  providers: [ImportFilesService],
})
export class ImportFilesModule {}
