import { IsString } from 'class-validator'

export class DirectoryDto {
  @IsString()
  folder: string
}

export class UpdateDirectoryDto extends DirectoryDto {
  @IsString()
  name: string
}
