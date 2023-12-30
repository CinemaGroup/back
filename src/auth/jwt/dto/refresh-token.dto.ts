import { IsBoolean, IsString } from 'class-validator'

export class RefreshTokenDto {
  @IsString()
  refreshToken: string

  @IsBoolean()
  isRemember: boolean
}
