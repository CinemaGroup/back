import { Prisma } from '@prisma/client'

export const productCategoryDtoObject: Prisma.ProductCategorySelect = {
  name: true,
  imagePath: true,
}
