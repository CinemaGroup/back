import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { CalculatorModule } from './calculator/calculator.module'
import { FileModule } from './file/file.module'
import { PaginationModule } from './pagination/pagination.module'
import { PrismaService } from './prisma.service'
import { ProductCategoryModule } from './product-category/product-category.module'
import { ProductGroupModule } from './product-group/product-group.module'
import { ProductTypeModule } from './product-type/product-type.module'
import { ProductModule } from './product/product.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    ProductTypeModule,
    PaginationModule,
    AuthModule,
    UserModule,
    FileModule,
    ProductModule,
    CalculatorModule,
    ProductGroupModule,
    ProductCategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
