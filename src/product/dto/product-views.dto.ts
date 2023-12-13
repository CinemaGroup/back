import { IsString } from 'class-validator'

export class ProductViewsDto {
  @IsString()
  slug: string
}
