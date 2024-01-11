import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { path } from 'app-root-path'
import { PaginationService } from 'src/pagination/pagination.service'
import { PrismaService } from 'src/prisma.service'
import { ProductService } from 'src/product/product.service'
import { FileController } from './file.controller'
import { FileService } from './file.service'

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: `${path}/uploads`,
      serveRoot: '/uploads',
    }),
  ],
  controllers: [FileController],
  providers: [FileService, PrismaService, ProductService, PaginationService],
})
export class FileModule {}
