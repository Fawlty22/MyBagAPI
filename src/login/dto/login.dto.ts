import { IsEmail, IsNotEmpty } from 'class-validator';
export class LoginDto {
  @IsNotEmpty()
  @IsEmail() //class-validators can be ignored here.
  username: string;

  @IsNotEmpty({ message: 'Password cannot be Empty.' })
  password: string;
}
