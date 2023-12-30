import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { RefreshTokenDto } from '../jwt/dto/refresh-token.dto'
import { GoogleCodeDto } from './dto/google-code.dto'
import { GoogleService } from './google.service'

@Controller('auth/google')
export class GoogleController {
  constructor(private readonly googleAuthService: GoogleService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async googleAuth(@Body() dto: GoogleCodeDto) {
    return this.googleAuthService.googleLogin(dto)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login/access-token')
  async getNewTokens(@Body() dto: RefreshTokenDto) {
    return this.googleAuthService.getNewTokens(dto.refreshToken)
  }
}
