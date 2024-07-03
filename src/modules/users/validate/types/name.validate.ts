import { UsersEntity } from '@modules/users/dtos/users.entity';
import { FieldValidation } from '@shared/interfaces/field-validate';

// Implementação da interface FieldValidation para validar o nome de usuário.
export class UserNameValidation implements FieldValidation<UsersEntity> {
  constructor(private readonly name: string) {}

  validate(user: UsersEntity): void {
    if (!user || this.name != user.username) {
      throw new Error('USERNOTFOUND');
    }
  }
}
