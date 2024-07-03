import { Injectable } from '@nestjs/common';
import {
  IReadDataFromFileUseCase,
  ReadDataFromFileUseCase,
} from './use-cases/read-data-from-file.usecase';

@Injectable()
export class ImportFilesService {
  constructor(private readonly readDataFromFile: ReadDataFromFileUseCase) {}

  importFiles = ({ filePath }: IReadDataFromFileUseCase) =>
    this.readDataFromFile.run.bind({ filePath });
}
