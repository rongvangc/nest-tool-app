import { IsString, IsStrongPassword, IsEmail } from 'class-validator';

export class AuthCreateDto {
  @IsEmail()
  email: string;

  @IsString()
  displayName: string;

  @IsString()
  photoURL: string;

  @IsStrongPassword({ minLength: 8 })
  password: string;
}

export class AuthLoginDto {
  @IsEmail()
  email: string;

  @IsStrongPassword({ minLength: 8 })
  password: string;
}
