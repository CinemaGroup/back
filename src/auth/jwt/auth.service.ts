import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import { hash, verify } from 'argon2'
import { createTransport } from 'nodemailer'
import { PrismaService } from 'src/prisma.service'
import { UserService } from 'src/user/user.service'
import { LoginDto, RegisterDto } from './dto/auth.dto'
import { ForgotPasswordDto, ResetPasswordDto } from './dto/forgot-password.dto'
import { RefreshTokenDto } from './dto/refresh-token.dto'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private userService: UserService,
    private configService: ConfigService
  ) {}

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto)
    const tokens = await this.issueTokens(user.id)

    return {
      user: this.returnUserFields(user),
      provider: 'media-building',
      isRemember: dto.isRemember,
      ...tokens,
    }
  }

  async register(dto: RegisterDto) {
    const existUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          {
            login: dto.login,
          },
          {
            email: dto.email,
          },
        ],
      },
    })

    if (existUser) throw new BadRequestException('User already exists')

    const user = await this.prisma.user.create({
      data: {
        login: dto.login,
        email: dto.email,
        password: await hash(dto.password),
      },
    })

    const tokens = await this.issueTokens(user.id)

    return {
      user: this.returnUserFields(user),
      provider: 'media-building',
      isRemember: dto.isRemember,
      ...tokens,
    }
  }

  async getNewTokens({ refreshToken, isRemember }: RefreshTokenDto) {
    const result = await this.jwt.verifyAsync(refreshToken)
    if (!result) throw new UnauthorizedException('Invalid refresh token')

    const user = await this.userService.byId(result.id, {
      isAdmin: true,
    })

    const tokens = await this.issueTokens(user.id)

    return {
      user: this.returnUserFields(user),
      provider: 'media-building',
      isRemember: isRemember,
      ...tokens,
    }
  }

  async forgotPassword({ email }: ForgotPasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) throw new NotFoundException('User not found')

    const data = { id: user.id }

    const token = this.jwt.sign(data, {
      expiresIn: '30m',
    })

    const transport = createTransport({
      host: 'smtp.timeweb.ru',
      port: 465,
      secure: true,
      auth: {
        user: 'support@media-building.ru',
        pass: '!Nf2s2bM6kLc',
      },
    })

    const sendEmail = await transport.sendMail({
      from: 'Media Building <support@media-building.ru>',
      to: email,
      subject: 'Media Building',
      html: `<a href='${process.env.REACT_APP_URL}/auth/reset?token=${token}&email=${user.email}'>Сброс пароля</a>`,
    })

    if (!sendEmail) throw new BadRequestException('Send email error')
  }

  async resetPassword(dto: ResetPasswordDto) {
    const isValid = await this.jwt.verifyAsync(dto.token)
    if (!isValid) throw new NotFoundException('Invalid token')

    const user = await this.prisma.user.update({
      where: {
        email: dto.email,
      },
      data: {
        password: await hash(dto.password),
      },
    })

    const tokens = await this.issueTokens(user.id)

    return {
      user: this.returnUserFields(user),
      provider: 'media-building',
      isRemember: true,
      ...tokens,
    }
  }

  private async issueTokens(userId: number) {
    const data = { id: userId }

    const accessToken = this.jwt.sign(data, {
      expiresIn: '15m',
    })

    const refreshToken = this.jwt.sign(data, {
      expiresIn: '7d',
    })

    return { accessToken, refreshToken }
  }

  private returnUserFields(user: User) {
    return {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    }
  }

  private async validateUser(dto: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          {
            login: dto.emailOrLogin,
          },
          {
            email: dto.emailOrLogin,
          },
        ],
      },
    })

    if (!user) throw new NotFoundException('User not found')

    const isValid = await verify(user.password, dto.password)

    if (!isValid) throw new UnauthorizedException('Invalid password')

    return user
  }
}
