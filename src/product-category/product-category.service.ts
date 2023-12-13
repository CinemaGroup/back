import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PaginationService } from 'src/pagination/pagination.service'
import { PrismaService } from 'src/prisma.service'
import { ProductService } from 'src/product/product.service'
import { EnumSort, QueryDto } from 'src/query-dto/query.dto'
import { generateSlug } from 'src/utils/generate-slug'
import { ProductCategoryDto } from './dto/product-category.dto'
import { productCategoryDtoObject } from './object/product-category-dto.object'
import { productCategoryObject } from './object/product-category.object'

@Injectable()
export class ProductCategoryService {
  constructor(
    private prisma: PrismaService,
    private paginationService: PaginationService,
    private productService: ProductService
  ) {}

  async getAll(dto: QueryDto = {}) {
    const { perPage, skip } = this.paginationService.getPagination(dto)

    const filters = this.createFilter(dto)

    const categories = await this.prisma.productCategory.findMany({
      where: filters,
      orderBy: this.getSortOption(dto.sort),
      skip,
      take: perPage,
      select: productCategoryObject,
    })

    return {
      categories,
      length: await this.prisma.productCategory.count({
        where: filters,
      }),
    }
  }

  async getCollections(type: string) {
    const { products } = await this.productService.getAll({
      type: `${type}`,
    })

    const categories = Array.from(
      new Set(products.map((product) => product.productCategory))
    )

    return {
      categories,
      length: categories.length,
    }
  }

  async bySlug(slug: string) {
    const category = await this.prisma.productCategory.findUnique({
      where: {
        slug,
      },
      select: productCategoryObject,
    })

    if (!category) throw new NotFoundException('Product category not found')

    return category
  }

  private getSortOption(
    sort: EnumSort
  ): Prisma.ProductCategoryOrderByWithRelationInput[] {
    switch (sort) {
      case EnumSort.NEWEST:
        return [{ createdAt: 'desc' }]
      case EnumSort.OLDEST:
        return [{ createdAt: 'asc' }]
      default:
        return [{ createdAt: 'desc' }]
    }
  }

  private createFilter(dto: QueryDto): Prisma.ProductCategoryWhereInput {
    const filters: Prisma.ProductCategoryWhereInput[] = []

    if (dto.searchTerm) filters.push(this.getSearchTermFilter(dto.searchTerm))

    return filters.length ? { AND: filters } : {}
  }

  private getSearchTermFilter(
    searchTerm: string
  ): Prisma.ProductCategoryWhereInput {
    return {
      name: {
        contains: searchTerm,
        mode: 'insensitive',
      },
    }
  }

  // Admin Place

  async byId(id: number) {
    const category = await this.prisma.productCategory.findUnique({
      where: {
        id,
      },
      select: productCategoryDtoObject,
    })

    if (!category) throw new NotFoundException('Product category not found')

    return category
  }

  async create() {
    const category = await this.prisma.productCategory.create({
      data: {
        name: '',
        slug: '',
        imagePath: '',
      },
    })

    return category.id
  }

  async update(id: number, dto: ProductCategoryDto) {
    return this.prisma.productCategory.update({
      where: {
        id,
      },
      data: {
        name: dto.name,
        slug: generateSlug(dto.name),
        imagePath: dto.imagePath,
      },
    })
  }

  async delete(id: number) {
    return this.prisma.productCategory.delete({
      where: {
        id,
      },
    })
  }
}
