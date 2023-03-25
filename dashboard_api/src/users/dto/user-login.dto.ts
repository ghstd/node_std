import { IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
	@IsEmail({}, { message: 'не верный email' })
	email: string;

	@IsString()
	password: string;
}