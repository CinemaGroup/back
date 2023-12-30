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
import { ProductQueryDto } from './dto/product-query.dto'
import { ProductViewsDto } from './dto/product-views.dto'
import { ProductDto } from './dto/product.dto'
import { ProductService } from './product.service'
import { Auth } from 'src/auth/jwt/decorators/auth.decorator'

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UsePipes(new ValidationPipe())
  @Get()
  async getAll(@Query() queryDto: ProductQueryDto) {
    return this.productService.getAll(queryDto)
  }

  @UsePipes(new ValidationPipe())
  @Get('collections')
  async getCollections(@Query() queryDto: ProductQueryDto) {
    return this.productService.getCollections(queryDto)
  }

  @Get('by-slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.productService.bySlug(slug)
  }

  @Get('similar/:id')
  async getSimilar(@Param('id') id: string) {
    return this.productService.getSimilar(+id)
  }

  @UsePipes(new ValidationPipe())
  @Put('update-views')
  @HttpCode(200)
  async updateViews(@Body() dto: ProductViewsDto) {
    return this.productService.updateViews(dto)
  }

  // Admin Place

  @Get(':id')
  @Auth('admin')
  async getById(@Param('id') id: string) {
    return this.productService.byId(+id)
  }

  @HttpCode(200)
  @Auth('admin')
  @Post()
  async create() {
    return this.productService.create()
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth('admin')
  async update(@Param('id') id: string, @Body() dto: ProductDto) {
    return this.productService.update(+id, dto)
  }

  @Auth('admin')
  @HttpCode(200)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.productService.delete(+id)
  }
}
