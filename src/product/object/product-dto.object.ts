import { Prisma } from '@prisma/client'
import {
  productAboutObject,
  productGetObject,
  productPrincipleObject,
  productServiceObject,
} from './product.object'

const productVariationDtoObject: Prisma.ProductVariationSelect = {
  class: true,
  sku: true,
  image: true,
  salePrice: true,
  price: true,
  boughtTimes: true,
  composition: true,
  information: true,
  shortDescription: true,
  service: { select: productServiceObject },
  rating: true,
}

export const productDtoObject: Prisma.ProductSelect = {
  name: true,
  description: true,
  videoPoster: true,
  videoPath: true,
  variations: { select: productVariationDtoObject },
  about: { select: productAboutObject },
  principles: { select: productPrincipleObject },
  gets: { select: productGetObject },
  relatedIds: true,
  productCategoryId: true,
  productTypeId: true,
  productGroupId: true,
}
