import { Prisma } from '@prisma/client'
import { calculatorObject } from 'src/calculator/object/calculator.object'
import { productObject } from 'src/product/object/product.object'

export const productCategoryObject: Prisma.ProductCategorySelect = {
  id: true,
  name: true,
  slug: true,
  imagePath: true,
  backgroundImage: true,
  phoneImage: true,
  calculator: { select: calculatorObject },
  createdAt: true,
}

export const productCategoryFullestObject: Prisma.ProductCategorySelect = {
  ...productCategoryObject,
  products: { select: productObject },
}
