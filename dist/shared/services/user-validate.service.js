"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidateService = void 0;
const bcrypt = require("bcrypt");
class UserValidateService {
    static password(user, password) {
        if (!user || !bcrypt.compareSync(password, user.password)) {
            throw new Error('INVALIDPASSWORD');
        }
        return this;
    }
    static userName(user, name) {
        if (!user || name != user.username) {
            throw new Error('USERNOTFOUND');
        }
        return this;
    }
}
exports.UserValidateService = UserValidateService;
//# sourceMappingURL=user-validate.service.js.map