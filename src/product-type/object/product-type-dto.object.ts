import { Prisma } from '@prisma/client'

export const productTypeDtoObject: Prisma.ProductTypeSelect = {
  name: true,
  description: true,
  color: true,
}
