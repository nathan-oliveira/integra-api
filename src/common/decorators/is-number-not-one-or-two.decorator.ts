import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export const IsNumberNotOneOrTwo = (validationOptions?: ValidationOptions) => {
  return function (object: NonNullable<object>, propertyName: string): void {
    registerDecorator({
      name: 'isNotNaN',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: number, _args: ValidationArguments) {
          return value === 0 || value === 1;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be either 0 or 1!`;
        },
      },
    });
  };
};
