import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export const IsNotNaN = (validationOptions?: ValidationOptions) => {
  return function (object: NonNullable<object>, propertyName: string): void {
    registerDecorator({
      name: 'isNotNaN',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: number, _args: ValidationArguments) {
          return !isNaN(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a number!`;
        },
      },
    });
  };
};
