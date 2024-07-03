/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

export function IsDateRange(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isDateRange',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const obj = args.object as any;
          const dateStart = obj.dateStart;
          const dateEnd = obj.dateEnd;
          return (!dateStart && !dateEnd) || (dateStart && dateEnd);
        },
        defaultMessage(_args: ValidationArguments) {
          return `DateStart e dateEnd devem ser fornecidos juntos`;
        },
      },
    });
  };
}
