import { Prisma } from '@prisma/client'

export const productGroupDtoObject: Prisma.ProductTypeSelect = {
  name: true,
  description: true,
}
