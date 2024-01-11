import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { Auth } from 'src/auth/jwt/decorators/auth.decorator'
import { DirectoryDto } from './dto/directory.dto'
import { QueryFilesDto } from './dto/query-file.dto'
import { FileService } from './file.service'

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @UsePipes(new ValidationPipe())
  @Get()
  async getAll(@Query() queryDto: QueryFilesDto) {
    return this.fileService.getAll(queryDto)
  }

  @Get('directories')
  async getDirectories() {
    return this.fileService.getDirectories()
  }

  @Post()
  @HttpCode(200)
  @Auth('admin')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Query('folder') folder?: string
  ) {
    return this.fileService.saveFiles(files, folder)
  }

  @UsePipes(new ValidationPipe())
  @Post('add-directory')
  @HttpCode(200)
  @Auth('admin')
  async addDirectory(@Body() dto: DirectoryDto) {
    return this.fileService.addDirectory(dto)
  }

  @Delete('directory/:folder')
  @HttpCode(200)
  @Auth('admin')
  async deleteDirectory(@Param('folder') folder: string) {
    return this.fileService.deleteDirectory(folder)
  }

  @Delete('file/:path')
  @HttpCode(200)
  @Auth('admin')
  async deleteFile(@Param('path') path: string) {
    return this.fileService.deleteFile(path)
  }
}
