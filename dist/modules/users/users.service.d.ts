import { OnModuleInit } from '@nestjs/common';
import { UsersEntity } from './dtos/users.entity';
export declare class UsersService implements OnModuleInit {
    private users;
    onModuleInit(): Promise<void>;
    private loadUsers;
    findOne(username: string): Promise<UsersEntity | undefined>;
}
