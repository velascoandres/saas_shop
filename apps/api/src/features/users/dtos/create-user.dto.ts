import { IsAlpha, IsEmail, IsNotEmpty, IsString, IsUrl } from 'class-validator';

import { EmailAvailable } from '@/auth/validations/email-available';

export class CreateUserDTO {
  @IsEmail()
  @EmailAvailable({
    message: 'email was taken by another user',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsAlpha()
  fullName: string;

  @IsNotEmpty()
  @IsUrl()
  picture: string;
}
