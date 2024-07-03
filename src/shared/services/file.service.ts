import { IRawData } from '@modules/orders/interfaces/rawdata.interface';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileService {
  /**
   * Método assíncrono para obter os dados de pedidos a partir de um arquivo JSON.
   * @returns Promise<IRawData[]> - Dados brutos dos pedidos.
   * @throws Error se houver algum problema ao ler o arquivo.
   */
  async getOrders(): Promise<IRawData[]> {
    try {
      const pathFolder = path.join(__dirname, '..', '..', '..');
      const filePath = `${pathFolder}\\data\\orders\\data-orders.json`;
      const data = await fs.promises.readFile(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      throw new Error(`Erro ao ler arquivo: ${error.message}`);
    }
  }

  /**
   * Método assíncrono para ler qualquer arquivo JSON dado o caminho especificado.
   * @param filePath - Caminho do arquivo a ser lido.
   * @returns Promise<T> - Objeto tipado com os dados do arquivo JSON.
   * @throws Error se houver algum problema ao ler o arquivo.
   */
  async readFile<T>(filePath: string): Promise<T> {
    try {
      const data = await fs.promises.readFile(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      throw new Error(`Erro ao ler arquivo: ${error.message}`);
    }
  }

  /**
   * Método assíncrono para escrever dados em um arquivo JSON no caminho especificado.
   * @param filePath - Caminho do arquivo a ser escrito.
   * @param data - Dados a serem escritos no arquivo.
   * @returns Promise<void>
   * @throws Error se houver algum problema ao escrever o arquivo.
   */
  async writeFile(filePath: string, data: any): Promise<void> {
    try {
      await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
      throw new Error(`Erro ao escrever arquivo: ${error.message}`);
    }
  }

  /**
   * Método assíncrono para deletar um arquivo dado o caminho especificado.
   * @param filePath - Caminho do arquivo a ser deletado.
   * @returns Promise<void>
   * @throws Error se o arquivo não existir ou se houver algum problema ao deletá-lo.
   */
  async deleteFile(filePath: string): Promise<void> {
    try {
      if (fs.existsSync(filePath)) {
        await fs.promises.unlink(filePath);
      } else {
        throw new Error('Arquivo não encontrado');
      }
    } catch (error) {
      throw new Error(`Erro ao deletar arquivo: ${error.message}`);
    }
  }
}
