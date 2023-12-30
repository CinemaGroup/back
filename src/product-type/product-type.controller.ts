import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { QueryDto } from 'src/query-dto/query.dto'
import { ProductTypeDto } from './dto/product-type.dto'
import { ProductTypeService } from './product-type.service'
import { Auth } from 'src/auth/jwt/decorators/auth.decorator'

@Controller('product-types')
export class ProductTypeController {
  constructor(private readonly productTypeService: ProductTypeService) {}

  @UsePipes(new ValidationPipe())
  @Get()
  async getAll(@Query() queryDto: QueryDto) {
    return this.productTypeService.getAll(queryDto)
  }

  @Get('by-slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.productTypeService.bySlug(slug)
  }

  // Admin Place

  @Get(':id')
  @Auth('admin')
  async getById(@Param('id') id: string) {
    return this.productTypeService.byId(+id)
  }

  @Auth('admin')
  @HttpCode(200)
  @Post()
  async create() {
    return this.productTypeService.create()
  }

  @Auth('admin')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: ProductTypeDto) {
    return this.productTypeService.update(+id, dto)
  }

  @Auth('admin')
  @HttpCode(200)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.productTypeService.delete(+id)
  }
}
