import { Injectable, OnModuleInit } from '@nestjs/common';
import { APIMESSAGE } from '@shared/services/api-message.helpers';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs-extra';
import * as path from 'path';
import { UsersEntity } from './dtos/users.entity';

/**
 * UsersService é um serviço responsável por gerenciar usuários,
 * incluindo carregar usuários a partir de um arquivo JSON e
 * encontrar um usuário pelo nome de usuário.
 */
@Injectable()
export class UsersService implements OnModuleInit {
  private users: UsersEntity[];

  /**
   * Método chamado quando o módulo é inicializado.
   * Carrega os usuários do arquivo JSON.
   */
  async onModuleInit() {
    await this.loadUsers();
  }

  /**
   * Load users from file.
   * Carrega os usuários a partir de um arquivo JSON.
   *
   * @private
   * @async
   * @returns {Promise<void>}
   */
  private async loadUsers() {
    try {
      const filePath = path.resolve(
        __dirname,
        '../../../data/users/users.json',
      );

      this.users = await fs.readJSON(filePath);

      for (const user of this.users) {
        if (!user.password.startsWith('$2b$')) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      }

      await fs.writeJSON(filePath, this.users);
    } catch (error) {
      console.error(
        APIMESSAGE.NOTFOUND('File with users entity not found'),
        error?.message,
      );
      this.users = [];
    }
  }

  /**
   * Encontra um usuário pelo nome de usuário.
   *
   * @async
   * @param {string} username - O nome de usuário a ser buscado.
   * @returns {Promise<UsersEntity | undefined>} O usuário encontrado ou undefined se não existir.
   */
  async findOne(username: string): Promise<UsersEntity | undefined> {
    if (!this.users) {
      await this.loadUsers();
    }
    return this.users.find((user) => user.username === username);
  }
}
