"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const api_message_helpers_1 = require("../../shared/services/api-message.helpers");
const bcrypt = require("bcrypt");
const fs = require("fs-extra");
const path = require("path");
let UsersService = class UsersService {
    async onModuleInit() {
        await this.loadUsers();
    }
    async loadUsers() {
        try {
            const filePath = path.resolve(__dirname, '../../../data/users/users.json');
            this.users = await fs.readJSON(filePath);
            for (const user of this.users) {
                if (!user.password.startsWith('$2b$')) {
                    user.password = await bcrypt.hash(user.password, 10);
                }
            }
            await fs.writeJSON(filePath, this.users);
        }
        catch (error) {
            console.error(api_message_helpers_1.APIMESSAGE.NOTFOUND('File with users entity not found'), error?.message);
            this.users = [];
        }
    }
    async findOne(username) {
        if (!this.users) {
            await this.loadUsers();
        }
        return this.users.find((user) => user.username === username);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
//# sourceMappingURL=users.service.js.map