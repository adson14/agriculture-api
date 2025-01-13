import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function ValidateFarmArea(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'validateFarmArea',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const totalArea = (args.object as any).total_area;
          const farmingArea = (args.object as any).farming_area;
          const vegetationArea = (args.object as any).vegetation_area;

          if (
            typeof totalArea !== 'number' ||
            typeof farmingArea !== 'number' ||
            typeof vegetationArea !== 'number'
          ) {
            return false;
          }

          return farmingArea + vegetationArea <= totalArea;
        },
        defaultMessage(args: ValidationArguments) {
          return `A soma das áreas agricultável e de vegetação não pode exceder a área total da fazenda.`;
        },
      },
    });
  };
}
