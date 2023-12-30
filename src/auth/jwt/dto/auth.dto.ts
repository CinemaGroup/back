import { IsBoolean, IsEmail, IsString, MinLength } from 'class-validator'

export class LoginDto {
  @IsString()
  emailOrLogin: string

  @IsString()
  password: string

  @IsBoolean()
  isRemember: boolean
}

export class RegisterDto {
  @IsString()
  @MinLength(5, {
    message: 'Password must be at least 6 characters long',
  })
  login: string

  @IsEmail()
  email: string

  @MinLength(6, {
    message: 'Password must be at least 6 characters long',
  })
  @IsString()
  password: string

  @IsBoolean()
  isRemember: boolean
}
