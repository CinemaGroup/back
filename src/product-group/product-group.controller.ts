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
import { ProductGroupDto } from './dto/product-group.dto'
import { ProductGroupService } from './product-group.service'

@Controller('product-groups')
export class ProductGroupController {
  constructor(private readonly productGroupService: ProductGroupService) {}

  @UsePipes(new ValidationPipe())
  @Get()
  async getAll(@Query() queryDto: QueryDto) {
    return this.productGroupService.getAll(queryDto)
  }

  // Admin Place

  @Get(':id')
  @Auth('admin')
  async getById(@Param('id') id: string) {
    return this.productGroupService.byId(+id)
  }

  @Auth('admin')
  @HttpCode(200)
  @Post()
  async create() {
    return this.productGroupService.create()
  }

  @Auth('admin')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: ProductGroupDto) {
    return this.productGroupService.update(+id, dto)
  }

  @Auth('admin')
  @HttpCode(200)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.productGroupService.delete(+id)
  }
}
