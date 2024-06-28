import { Controller } from '@nestjs/common';
import { ImportFilesService } from './import-files.service';

@Controller('import-files')
export class ImportFilesController {
  constructor(private readonly importFilesService: ImportFilesService) {}
}
