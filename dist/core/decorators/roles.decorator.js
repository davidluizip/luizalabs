"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = exports.ROLES_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.ROLES_KEY = 'roles';
const Roles = (...args) => (0, common_1.SetMetadata)(exports.ROLES_KEY, args);
exports.Roles = Roles;
//# sourceMappingURL=roles.decorator.js.map