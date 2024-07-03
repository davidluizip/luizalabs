import { ImportFilesController } from '@modules/import-files/import-files.controller';
import { ImportFilesService } from '@modules/import-files/import-files.service';
import { ReadDataFromFileUseCase } from '@modules/import-files/use-cases/read-data-from-file.usecase';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import { FileService } from '@shared/services/file.service';

describe('ImportFilesController', () => {
  let controller: ImportFilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EventEmitterModule.forRoot()],
      controllers: [ImportFilesController],
      providers: [ImportFilesService, ReadDataFromFileUseCase, FileService],
    }).compile();

    controller = module.get<ImportFilesController>(ImportFilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
