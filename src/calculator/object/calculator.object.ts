import { Prisma } from '@prisma/client'

export const calculatorObject: Prisma.CalculatorSelect = {
  id: true,
  variations: true,
  tariffs: true,
  enableLink: true,
  link: true,
  enableSale: true,
  salePercent: true,
  maxPercent: true,
  perPrice: true,
  createdAt: true,
}
