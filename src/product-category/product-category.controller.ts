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
import { Auth } from 'src/auth/decorators/auth.decorator'
import { QueryDto } from 'src/query-dto/query.dto'
import { ProductCategoryDto } from './dto/product-category.dto'
import { ProductCategoryService } from './product-category.service'

@Controller('product-categories')
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService
  ) {}

  @UsePipes(new ValidationPipe())
  @Get()
  async getAll(@Query() queryDto: QueryDto) {
    return this.productCategoryService.getAll(queryDto)
  }

  @UsePipes(new ValidationPipe())
  @Get('collections/:type')
  async getCollections(@Param('type') type: string) {
    return this.productCategoryService.getCollections(type)
  }

  @Get('by-slug/:slug')
  async bySlug(@Param('slug') slug: string) {
    return this.productCategoryService.bySlug(slug)
  }

  // Admin Place

  @Get(':id')
  @Auth('admin')
  async get(@Param('id') id: string) {
    return this.productCategoryService.byId(+id)
  }

  @Post()
  @HttpCode(200)
  @Auth('admin')
  async create() {
    return this.productCategoryService.create()
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @HttpCode(200)
  @Auth('admin')
  async update(@Param('id') id: string, @Body() dto: ProductCategoryDto) {
    return this.productCategoryService.update(+id, dto)
  }

  @Delete(':id')
  @HttpCode(200)
  @Auth('admin')
  async delete(@Param('id') id: string) {
    return this.productCategoryService.delete(+id)
  }
}
