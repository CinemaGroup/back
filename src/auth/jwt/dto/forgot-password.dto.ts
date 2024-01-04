import { IsEmail, IsString } from 'class-validator'

export class ForgotPasswordDto {
  @IsEmail()
  email: string
}

export class ResetPasswordDto {
  @IsString()
  token: string

  @IsEmail()
  email: string

  @IsString()
  password: string
}
