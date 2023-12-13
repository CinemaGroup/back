import { Module } from '@nestjs/common'
import { PaginationService } from 'src/pagination/pagination.service'
import { PrismaService } from 'src/prisma.service'
import { ProductGroupController } from './product-group.controller'
import { ProductGroupService } from './product-group.service'

@Module({
  controllers: [ProductGroupController],
  providers: [ProductGroupService, PrismaService, PaginationService],
})
export class ProductGroupModule {}
