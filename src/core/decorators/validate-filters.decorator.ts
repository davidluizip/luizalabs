// validate-filters.decorator.ts
import { Result } from '@base/results-api.base';
import { IUserSessionBase } from '@interfaces/user-response.interface';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export const ValidParams = createParamDecorator(
  async (dto: new (obj: any) => any, ctx: ExecutionContext) => {
    try {
      const { filters, pagination, order, user } = ctx
        .switchToHttp()
        .getRequest();

      if (dto) {
        const dtoInstance = new dto(filters);

        const _filters = removeUndefinedProperties(dtoInstance);

        const filtersDTO = plainToClass(dto, _filters);

        const errors = await validate(filtersDTO);

        if (errors.length > 0) {
          const response = ctx.switchToHttp().getResponse();
          response.setHeader('Content-Type', 'application/json');
          response.status(422).json(Result.Fail('ValidParams:', errors, 422));
          return null;
        }
        return {
          pagination,
          orderBy: order,
          filters: removeUndefinedProperties(filtersDTO),
          user,
        };
      }

      return {
        pagination,
        orderBy: order,
        filters: null,
        user,
      };
    } catch (error) {
      console.log(error);
    }
  },
);

export const GetUserSession = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext): Promise<IUserSessionBase> => {
    try {
      const { user } = ctx.switchToHttp().getRequest();

      if (!user?.userId) {
        const response = ctx.switchToHttp().getResponse();
        response.setHeader('Content-Type', 'application/json');
        response.status(422).json(Result.Fail('Invalid Session', 400));
        return null;
      }

      return user as IUserSessionBase;
    } catch (error) {
      console.log(error);
    }
  },
);

const removeUndefinedProperties = (obj: any) => {
  const cleanedObj = {};
  Object.entries(obj).forEach(([key, value]) => {
    if (value !== undefined) {
      cleanedObj[key] = value;
    }
  });
  return cleanedObj;
};
