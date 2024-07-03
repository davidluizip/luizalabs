import { UsersEntity } from '@modules/users/dtos/users.entity';
import { FieldValidation } from '@shared/interfaces/field-validate';
import { UserNameValidation } from './types/name.validate';
import { PasswordValidation } from './types/password.validate';

// Classe que constrói validadores para campos específicos de uma entidade de usuário.
export class ValidateBuilder {
  constructor(
    private readonly user: UsersEntity,
    private readonly validations: FieldValidation<UsersEntity>[],
  ) {}

  static setEntity(user: UsersEntity) {
    return new ValidateBuilder(user, []);
  }

  password(password: string): ValidateBuilder {
    this.validations.push(new PasswordValidation(password));
    return this;
  }

  userName(username: string): ValidateBuilder {
    this.validations.push(new UserNameValidation(username));
    return this;
  }

  // Executa todas as validações adicionadas ao construtor para a entidade de usuário fornecida.
  build(): void {
    for (const validation of this.validations) {
      validation.validate(this.user);
    }
  }
}
