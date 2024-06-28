import { Test, TestingModule } from '@nestjs/testing';
import { ImportFilesController } from './import-files.controller';
import { ImportFilesService } from './import-files.service';

describe('ImportFilesController', () => {
  let controller: ImportFilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImportFilesController],
      providers: [ImportFilesService],
    }).compile();

    controller = module.get<ImportFilesController>(ImportFilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
