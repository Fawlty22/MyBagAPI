import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotPasswordDto {

  @IsNotEmpty()
  @IsEmail() //class-validators can be ignored here.
  username: string;
}
