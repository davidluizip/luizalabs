import { Injectable } from '@nestjs/common';
import {
  IReadDataFromFileUseCase,
  ReadDataFromFileUseCase,
} from './use-cases/read-data-from-file.usecase';

@Injectable()
export class ImportFilesService {
  constructor(private readonly readDataFromFile: ReadDataFromFileUseCase) {}

  /**
   * Método importFiles que vincula o caminho do arquivo especificado ao método run de ReadDataFromFileUseCase.
   * @param filePath Caminho do arquivo a ser importado.
   * @returns Uma função vinculada que pode ser executada para iniciar a importação do arquivo especificado.
   */
  importFiles = ({ filePath }: IReadDataFromFileUseCase) =>
    this.readDataFromFile.run.bind({ filePath });
}
