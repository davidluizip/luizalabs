import { Module } from '@nestjs/common';
import { FileService } from '@shared/services/file.service';
import { ImportFilesController } from './import-files.controller';
import { ImportFilesService } from './import-files.service';
import { ReadDataFromFileUseCase } from './use-cases/read-data-from-file.usecase';

@Module({
  controllers: [ImportFilesController],
  providers: [ImportFilesService, ReadDataFromFileUseCase, FileService],
})
export class ImportFilesModule {}
