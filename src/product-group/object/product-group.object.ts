import { Prisma } from '@prisma/client'
import { productObject } from 'src/product/object/product.object'

export const productGroupObject: Prisma.ProductGroupSelect = {
  id: true,
  name: true,
  slug: true,
  description: true,
  createdAt: true,
}

export const productGroupFullestObject: Prisma.ProductGroupSelect = {
  ...productGroupObject,
  products: { select: productObject },
}
