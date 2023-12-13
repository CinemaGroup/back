import { Prisma } from '@prisma/client'
import { productCategoryObject } from 'src/product-category/object/product-category.object'
import { productGroupObject } from 'src/product-group/object/product-group.object'
import { productTypeObject } from 'src/product-type/object/product-type.object'

export const productServiceItemObject: Prisma.ProductServiceItemSelect = {
  title: true,
  price: true,
}

export const productServiceObject: Prisma.ProductServiceSelect = {
  title: true,
  items: { select: productServiceItemObject },
}

const productVariationObject: Prisma.ProductVariationSelect = {
  id: true,
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
  reviews: true,
  rating: true,
}

const productAboutItemObject: Prisma.ProductAboutItemSelect = {
  title: true,
  description: true,
}

export const productAboutObject: Prisma.ProductAboutSelect = {
  title: true,
  items: { select: productAboutItemObject },
}

export const productPrincipleObject: Prisma.ProductPrincipleSelect = {
  title: true,
  description: true,
  imagePath: true,
}

export const productGetObject: Prisma.ProductGetSelect = {
  title: true,
  description: true,
  imagePath: true,
}

export const productObject: Prisma.ProductSelect = {
  id: true,
  name: true,
  slug: true,
  description: true,
  videoPoster: true,
  videoPath: true,
  variations: { select: productVariationObject },
  about: { select: productAboutObject },
  principles: { select: productPrincipleObject },
  gets: { select: productGetObject },
  productGroup: { select: productGroupObject },
  productType: { select: productTypeObject },
  productCategory: { select: productCategoryObject },
  views: true,
  createdAt: true,
}
