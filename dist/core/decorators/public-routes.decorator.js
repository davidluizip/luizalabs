"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = exports.ROLES_KEY = void 0;
const common_1 = require("@nestjs/common");
const profile_user_enum_1 = require("../enums/profile-user.enum");
exports.ROLES_KEY = 'roles';
const Roles = (..._roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, [profile_user_enum_1.ProfileUserEnum.PUBLIC]);
exports.Roles = Roles;
//# sourceMappingURL=public-routes.decorator.js.map