import { Test, TestingModule } from '@nestjs/testing';
import { ImportFilesService } from './import-files.service';

describe('ImportFilesService', () => {
  let service: ImportFilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImportFilesService],
    }).compile();

    service = module.get<ImportFilesService>(ImportFilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
