import { IsString } from 'class-validator'

export class ProductGroupDto {
	@IsString()
	name: string

	@IsString()
	description: string
}