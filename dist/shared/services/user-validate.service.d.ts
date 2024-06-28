import { UsersEntity } from '@modules/users/dtos/users.entity';
export declare class UserValidateService {
    static password(user: UsersEntity, password: string): typeof UserValidateService;
    static userName(user: UsersEntity, name: string): typeof UserValidateService;
}
