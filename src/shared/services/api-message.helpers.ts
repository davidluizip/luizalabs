type TAPIMESSAGE = {
  [key: string]: any;
};
interface IAPIMESSAGERES {
  code: number;
  message: string;
}
export const APIMESSAGE: TAPIMESSAGE = {
  NOTFOUND: (message = 'não encontrado') => {
    return {
      code: 10,
      message,
    };
  },
  NOTPERMISSION: (
    message = 'usuário não tem sem permissão para acessar este recurso',
  ) => {
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
  JWTERROR: (
    message = 'Erro ao tentar gerar o token do serviço',
  ): IAPIMESSAGERES => {
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
