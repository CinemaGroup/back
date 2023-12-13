import { IsEnum, IsOptional, IsString } from 'class-validator'
import { PaginationDto } from 'src/pagination/dto/pagination.dto'

export enum EnumSort {
  NEWEST = 'newest',
  OLDEST = 'oldest',
}

export class QueryDto extends PaginationDto {
  @IsOptional()
  @IsEnum(EnumSort)
  sort?: EnumSort

  @IsOptional()
  @IsString()
  searchTerm?: string
}
