import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PaginationService } from 'src/pagination/pagination.service'
import { PrismaService } from 'src/prisma.service'
import { generateSlug } from 'src/utils/generate-slug'
import { generateRandomNumber } from 'src/utils/random-number'
import { EnumProductSort, ProductQueryDto } from './dto/product-query.dto'
import { ProductViewsDto } from './dto/product-views.dto'
import { ProductDto } from './dto/product.dto'
import { productDtoObject } from './object/product-dto.object'
import { productObject } from './object/product.object'

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private paginationService: PaginationService
  ) {}

  async getAll(dto: ProductQueryDto = {}) {
    const { perPage, skip } = this.paginationService.getPagination(dto)

    const filters = this.createFilter(dto)

    const products = await this.prisma.product.findMany({
      where: filters,
      orderBy: this.getSortOption(dto.sort),
      skip,
      take: perPage,
      select: productObject,
    })

    return {
      products,
      length: await this.prisma.product.count({
        where: filters,
      }),
    }
  }

  async getCollections(dto: ProductQueryDto = {}) {
    const { perPage, skip } = this.paginationService.getPagination(dto)

    const filters = this.createFilter(dto)

    const products = await this.prisma.product.findMany({
      where: filters,
      orderBy: this.getSortOption(dto.sort),
      skip,
      take: perPage,
      select: productObject,
    })

    const groups = products.map((product) => {
      return {
        name: product.productGroup.name,
        description: product.productGroup.description,
        products: [product],
      }
    })

    return {
      groups,
      length: await this.prisma.product.count({
        where: filters,
      }),
    }
  }

  async bySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        slug,
      },
      select: productObject,
    })

    if (!product) throw new NotFoundException('Product not found')

    return product
  }

  async getSimilar(id: number) {
    const currentProduct = await this.byId(id)

    if (!currentProduct)
      throw new NotFoundException('Current product not found')

    const products = await this.prisma.product.findMany({
      where: {
        NOT: {
          id: currentProduct.id,
        },
        productCategoryId: currentProduct.productCategoryId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: productObject,
    })

    return products
  }

  async updateViews({ slug }: ProductViewsDto) {
    return this.prisma.product.update({
      where: {
        slug,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    })
  }

  private createFilter(dto: ProductQueryDto): Prisma.ProductWhereInput {
    const filters: Prisma.ProductWhereInput[] = []

    if (dto.searchTerm) filters.push(this.getSearchTermFilter(dto.searchTerm))

    if (dto.category)
      filters.push(this.getProductCategoryFilter(dto.category.split('|')))

    if (dto.type) filters.push(this.getProductTypeFilter(dto.type.split('|')))

    return filters.length ? { AND: filters } : {}
  }

  private getSortOption(
    sort: EnumProductSort
  ): Prisma.ProductOrderByWithRelationInput[] {
    switch (sort) {
      case EnumProductSort.POPULAR:
        return [{ views: 'desc' }]
      case EnumProductSort.NEWEST:
        return [{ createdAt: 'desc' }]
      case EnumProductSort.OLDEST:
        return [{ createdAt: 'asc' }]
      default:
        return [{ createdAt: 'desc' }]
    }
  }

  private getSearchTermFilter(searchTerm: string): Prisma.ProductWhereInput {
    return {
      OR: [
        {
          productCategory: {
            name: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        },
        {
          name: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
      ],
    }
  }

  private getProductCategoryFilter(
    categories: string[]
  ): Prisma.ProductWhereInput {
    return {
      productCategory: {
        slug: {
          in: categories,
        },
      },
    }
  }

  private getProductTypeFilter(
    productTypes: string[]
  ): Prisma.ProductWhereInput {
    return {
      productType: {
        slug: {
          in: productTypes,
        },
      },
    }
  }

  // Admin Place

  async byId(id: number) {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
      select: productDtoObject,
    })

    if (!product) throw new NotFoundException('Product not found')

    return product
  }

  async create() {
    const product = await this.prisma.product.create({
      data: {
        name: '',
        slug: '',
        description: '',
        videoPoster: '',
        videoPath: '',
        relatedIds: [],
        about: {
          create: {
            title: '',
            items: {
              create: {
                title: '',
                description: '',
              },
            },
          },
        },
        principles: {
          create: {
            title: '',
            description: '',
            imagePath: '',
          },
        },
        gets: {
          create: {
            title: '',
            description: '',
            imagePath: '',
          },
        },
        variations: {
          create: {
            class: '',
            sku: '',
            image: '',
            price: 0,
            boughtTimes: generateRandomNumber(2000, 5000, 'number'),
            service: {
              create: {
                title: '',
                items: {
                  create: {
                    title: '',
                    price: 0,
                  },
                },
              },
            },
            composition: '',
            information: '',
            shortDescription: '',
            rating: generateRandomNumber(4.9, 5, 'float'),
          },
        },
      },
    })

    return product.id
  }

  async update(id: number, dto: ProductDto) {
    return this.prisma.product.update({
      where: {
        id,
      },
      data: {
        name: dto.name,
        slug: generateSlug(dto.name),
        description: dto.description,
        videoPoster: dto.videoPoster,
        videoPath: dto.videoPath,
        variations: {
          deleteMany: {},
          create: dto.variations.map((variation) => {
            const variationData: Prisma.ProductVariationCreateInput = {
              class: variation.class,
              sku: variation.sku,
              image: variation.image,
              salePrice: variation.salePrice,
              price: variation.price,
              boughtTimes: variation.boughtTimes,
              composition: variation.composition,
              information: variation.information,
              shortDescription: variation.shortDescription,
              rating: variation.rating,
              service: variation.service
                ? {
                    create: {
                      title: variation.service.title || '',
                      items: {
                        createMany: {
                          data: variation.service.items.map((item) => ({
                            title: item.title,
                            price: item.price,
                          })),
                        },
                      },
                    },
                  }
                : undefined,
            }

            return variationData
          }),
        },
        about: {
          deleteMany: {},
          create: dto.about.map((about) => ({
            title: about.title,
            items: {
              create: about.items.map((item) => ({
                title: item.title,
                description: item.description,
              })),
            },
          })),
        },
        principles: {
          deleteMany: {},
          createMany: {
            data: dto.principles.map((principle) => ({
              title: principle.title,
              description: principle.description,
              imagePath: principle.imagePath,
            })),
          },
        },
        gets: {
          deleteMany: {},
          createMany: {
            data: dto.gets.map((get) => ({
              title: get.title,
              description: get.description,
              imagePath: get.imagePath,
            })),
          },
        },
        productCategory: {
          connect: { id: dto.productCategoryId },
        },
        productGroup: {
          connect: { id: dto.productGroupId },
        },
        productType: {
          connect: { id: dto.productTypeId },
        },
        relatedIds: dto.relatedIds,
      },
    })
  }

  async delete(id: number) {
    return this.prisma.product.delete({
      where: {
        id,
      },
    })
  }
}
