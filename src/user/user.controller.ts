import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'

import { Auth } from 'src/auth/jwt/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/jwt/decorators/user.decorator'
import { UserDto } from './dto/user.dto'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(new ValidationPipe())
  @Get()
  async getAll(@Query('searchTerm') searchTerm?: string) {
    return this.userService.getAll(searchTerm)
  }

  @Get('profile')
  @Auth()
  async getProfile(@CurrentUser('id') id: number) {
    return this.userService.byId(id)
  }

  @UsePipes(new ValidationPipe())
  @Auth()
  @HttpCode(200)
  @Put('profile')
  async updateProfile(@CurrentUser('id') id: number, @Body() dto: UserDto) {
    return this.userService.updateProfile(id, dto)
  }

  @Auth()
  @HttpCode(200)
  @Patch('profile/favorites/:productId')
  async toggleFavorite(
    @CurrentUser('id') id: number,
    @Param('productId') productId: string
  ) {
    return this.userService.toggleFavorite(id, +productId)
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth('admin')
  async deleteProduct(@Param('id') id: string) {
    return this.userService.delete(+id)
  }
}
