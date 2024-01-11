import { Type } from 'class-transformer'
import {
  ArrayNotEmpty,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator'

class ProductServiceItemDto {
  @IsString()
  title: string

  @IsNumber()
  price: number
}

class ProductServiceDto {
  @IsString()
  title: string

  @ArrayNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductServiceItemDto)
  items: ProductServiceItemDto[]
}

class ProductVariationDto {
  @IsString()
  class: string

  @IsString()
  sku: string

  @IsString()
  image: string

  @IsOptional()
  @IsNumber()
  salePrice?: number

  @IsNumber()
  price: number

  @IsNumber()
  boughtTimes: number

  @IsString()
  composition: string

  @IsString()
  information: string

  @IsString()
  shortDescription: string

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ProductServiceDto)
  service?: ProductServiceDto

  @IsNumber()
  rating: number
}

class ProductGetDto {
  @IsString()
  title: string

  @IsString()
  description: string

  @IsString()
  imagePath: string
}

class ProductPrincipleDto {
  @IsString()
  title: string

  @IsString()
  description: string

  @IsString()
  imagePath: string
}

class ProductAboutItemDto {
  @IsString()
  title: string

  @IsString()
  description: string
}

class ProductAboutDto {
  @IsString()
  title: string

  @ArrayNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductAboutItemDto)
  items: ProductAboutItemDto[]
}

export class ProductDto {
  @IsString()
  name: string

  @IsString()
  description: string

  @IsOptional()
  @IsString()
  videoPoster?: string

  @IsOptional()
  @IsString()
  videoPath?: string

  @ArrayNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductVariationDto)
  variations: ProductVariationDto[]

  @ValidateNested({ each: true })
  @Type(() => ProductAboutDto)
  about: ProductAboutDto[]

  @ArrayNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductPrincipleDto)
  principles: ProductPrincipleDto[]

  @ArrayNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductGetDto)
  gets: ProductGetDto[]

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  relatedIds?: number[]

  @IsNumber()
  productCategoryId: number

  @IsNumber()
  productTypeId: number

  @IsNumber()
  productGroupId: number
}
