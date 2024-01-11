import { IsString } from 'class-validator'

export class ProductCategoryDto {
  @IsString()
  name: string

  @IsString()
  imagePath: string

  @IsString()
  backgroundImage: string

  @IsString()
  phoneImage: string
}
