import { Module } from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';
import { ProductCategoryController } from './product-category.controller';
import { PrismaService } from 'src/prisma.service'
import { PaginationService } from 'src/pagination/pagination.service'
import { ProductService } from 'src/product/product.service'

@Module({
  controllers: [ProductCategoryController],
  providers: [ProductCategoryService, PrismaService, PaginationService, ProductService],
})
export class ProductCategoryModule {}
