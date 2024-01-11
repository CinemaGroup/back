import { IsOptional, IsString } from 'class-validator'

export class QueryFilesDto {
	@IsOptional()
	@IsString()
	folder?: string

	@IsOptional()
	@IsString()
	searchTerm?: string
}
