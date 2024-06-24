import { UsersService } from '@/users/services/users.service';
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class EmailAvailableConstraint implements ValidatorConstraintInterface {
  constructor(private readonly userService: UsersService) {}

  async validate(email: string): Promise<boolean> {
    const user = await this.userService.findUserByEmail(email);

    return !user;
  }
}
export function EmailAvailable(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: EmailAvailableConstraint,
    });
  };
}
