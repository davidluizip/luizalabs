import { Result } from '@base/results-api.base';
import { UseCase } from '@base/use-case';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { FileService } from '@shared/services/file.service';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

export interface IReadDataFromFileUseCase {
  filePath: Buffer;
}

@Injectable()
export class ReadDataFromFileUseCase implements UseCase<Result<any>> {
  constructor(private fileService: FileService) {}

  @OnEvent('import.file')
  async run({ filePath }: IReadDataFromFileUseCase): Promise<Result<any>> {
    const pathFolder = path.join(__dirname, '..', '..', '..', '..');
    const file = `${pathFolder}\\${filePath}`;
    const stream = fs.createReadStream(file);

    const reader = readline.createInterface({
      input: stream,
      crlfDelay: Infinity,
    });

    const records = [];

    for await (const line of reader) {
      const userId = line.slice(0, 10).trimStart();
      const userName = line.slice(10, 55).trim();
      const orderId = line.slice(55, 65).trimStart();
      const prodId = line.slice(65, 75).trimStart();
      const value = parseFloat(line.slice(75, 87).trim());
      const date = line.slice(87, 95);

      records.push({
        userId,
        userName,
        orderId,
        prodId,
        value,
        date,
      });
    }

    const outputFilePath = path.join(
      `${pathFolder}\\data\\orders`,
      'data-orders.json',
    );

    let existingRecords = [];

    if (fs.existsSync(outputFilePath)) {
      existingRecords = await this.fileService.readFile(outputFilePath);
    }

    const combinedRecords = [...existingRecords, ...records];

    await this.fileService.writeFile(outputFilePath, combinedRecords);

    await this.fileService.deleteFile(file);

    return Result.Ok<any>({
      data: records,
      meta: null,
    });
  }
}
