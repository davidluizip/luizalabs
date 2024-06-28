import { UsersEntity } from '@modules/users/dtos/users.entity';
import * as bcrypt from 'bcrypt';

export class UserValidateService {
  static password(user: UsersEntity, password: string) {
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new Error('INVALIDPASSWORD');
    }

    return this;
  }
  static userName(user: UsersEntity, name: string) {
    if (!user || name != user.username) {
      throw new Error('USERNOTFOUND');
    }

    return this;
  }
}
