"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIMESSAGE = void 0;
exports.APIMESSAGE = {
    NOTFOUND: (message = 'não encontrado') => {
        return {
            code: 10,
            message,
        };
    },
    NOTPERMISSION: (message = 'usuário não tem sem permissão para acessar este recurso') => {
        return {
            code: 11,
            message,
        };
    },
    INVALIDPASSWORD: (message = 'Senha Inválida') => {
        return {
            code: 12,
            message,
        };
    },
    JWTNONCOMPLIANT: (message = 'JWT não está em inconformidade') => {
        return {
            code: 13,
            message,
        };
    },
    BFFAUTHORIZATION: (message = 'sem autorização para acessar este serviço') => {
        return {
            code: 14,
            message,
        };
    },
    JWTERROR: (message = 'Erro ao tentar gerar o token do serviço') => {
        return {
            code: 15,
            message,
        };
    },
    USERNOTFOUND: (message = 'usuário não encontrado') => {
        return {
            code: 16,
            message,
        };
    },
};
//# sourceMappingURL=api-message.helpers.js.map