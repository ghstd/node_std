import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'не верный email' })
	email: string;

	@IsString({ message: 'не задан пароль' })
	password: string;

	@IsString({ message: 'не задано имя' })
	name: string;
}