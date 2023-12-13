import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PaginationService } from 'src/pagination/pagination.service'
import { PrismaService } from 'src/prisma.service'
import { EnumSort, QueryDto } from 'src/query-dto/query.dto'
import { generateSlug } from 'src/utils/generate-slug'
import { ProductGroupDto } from './dto/product-group.dto'
import {
  productGroupFullestObject,
  productGroupObject,
} from './object/product-group.object'
import { productGroupDtoObject } from './object/product-group-dto.object'

@Injectable()
export class ProductGroupService {
  constructor(
    private prisma: PrismaService,
    private paginationService: PaginationService
  ) {}

  async getAll(dto: QueryDto = {}) {
    const { perPage, skip } = this.paginationService.getPagination(dto)

    const filters = this.getSearchTermFilter(dto.searchTerm)

    const groups = await this.prisma.productGroup.findMany({
      where: filters,
      orderBy: this.getSortOption(dto.sort),
      skip,
      take: perPage,
      select: productGroupObject,
    })

    return {
      groups,
      length: await this.prisma.productGroup.count({
        where: filters,
      }),
    }
  }

  private getSortOption(
    sort: EnumSort
  ): Prisma.ProductGroupOrderByWithRelationInput[] {
    switch (sort) {
      case EnumSort.NEWEST:
        return [{ createdAt: 'desc' }]
      case EnumSort.OLDEST:
        return [{ createdAt: 'asc' }]
      default:
        return [{ createdAt: 'desc' }]
    }
  }

  private getSearchTermFilter(
    searchTerm: string
  ): Prisma.ProductGroupWhereInput {
    return {
      name: {
        contains: searchTerm,
        mode: 'insensitive',
      },
    }
  }

  // Admin Place

  async byId(id: number) {
    const group = await this.prisma.productGroup.findUnique({
      where: {
        id,
      },
      select: productGroupDtoObject,
    })

    if (!group) throw new NotFoundException('Product Group not found')

    return group
  }

  async create() {
    const group = await this.prisma.productGroup.create({
      data: {
        name: '',
        slug: '',
        description: '',
      },
    })

    return group.id
  }

  async update(id: number, dto: ProductGroupDto) {
    return this.prisma.productGroup.update({
      where: {
        id,
      },
      data: {
        name: dto.name,
        slug: generateSlug(dto.name),
        description: dto.description,
      },
    })
  }

  async delete(id: number) {
    return this.prisma.productGroup.delete({
      where: {
        id,
      },
    })
  }
}
