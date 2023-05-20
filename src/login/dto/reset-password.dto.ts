import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResetPasswordDto {
    @IsNotEmpty()
    @IsEmail() //class-validators can be ignored here.
    username: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    confirmationCode: string;
}
