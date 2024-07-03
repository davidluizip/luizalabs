import { ImportFilesService } from '@modules/import-files/import-files.service';
import { ReadDataFromFileUseCase } from '@modules/import-files/use-cases/read-data-from-file.usecase';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import { FileService } from '@shared/services/file.service';

describe('ImportFilesService', () => {
  let service: ImportFilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EventEmitterModule.forRoot()],
      providers: [ImportFilesService, ReadDataFromFileUseCase, FileService],
    }).compile();

    service = module.get<ImportFilesService>(ImportFilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
