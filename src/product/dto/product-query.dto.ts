import { IsEnum, IsOptional, IsString } from 'class-validator'
import { PaginationDto } from 'src/pagination/dto/pagination.dto'

export enum EnumProductSort {
  POPULAR = 'popular',
  NEWEST = 'newest',
  OLDEST = 'oldest',
}

export class ProductQueryDto extends PaginationDto {
  @IsOptional()
  @IsEnum(EnumProductSort)
  sort?: EnumProductSort

  @IsOptional()
  @IsString()
  searchTerm?: string

  @IsOptional()
  @IsString()
  type?: string

  @IsOptional()
  @IsString()
  category?: string
}
