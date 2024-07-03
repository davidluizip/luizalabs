import { UsersEntity } from '@modules/users/dtos/users.entity';
import { FieldValidation } from '@shared/interfaces/field-validate';
import * as bcrypt from 'bcrypt';

export class PasswordValidation implements FieldValidation<UsersEntity> {
  constructor(private readonly password: string) {}

  validate(user: UsersEntity): void {
    if (!user || !bcrypt.compareSync(this.password, user.password)) {
      throw new Error('INVALIDPASSWORD');
    }
  }
}
