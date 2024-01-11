import { Injectable } from '@nestjs/common'
import { path } from 'app-root-path'
import { ensureDir, readdirSync, remove, writeFile } from 'fs-extra'
import { join } from 'path'
import { PrismaService } from 'src/prisma.service'
import { ProductService } from 'src/product/product.service'
import { DirectoryDto } from './dto/directory.dto'
import { QueryFilesDto } from './dto/query-file.dto'
import { FileResponse } from './interface/file.interface'

@Injectable()
export class FileService {
  constructor(
    private productService: ProductService,
    private prisma: PrismaService
  ) {}

  async getAll(dto: QueryFilesDto = {}) {
    let allFiles = []

    if (dto.folder) {
      const folderPath = join(path, 'uploads', dto.folder)
      const filesInFolder = readdirSync(folderPath)

      // Добавьте фильтрацию по searchTerm
      allFiles = filesInFolder
        .filter((file) =>
          file.toLowerCase().includes((dto.searchTerm || '').toLowerCase())
        )
        .map((file) => ({
          name: file,
          url: join('/uploads', dto.folder, file).replace(/\\/g, '/'),
        }))
    } else {
      const baseFolderPath = join(path, 'uploads')
      const allFolders = readdirSync(baseFolderPath, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name)

      allFolders.forEach((folder) => {
        const folderPath = join(baseFolderPath, folder)
        const filesInFolder = readdirSync(folderPath)

        // Добавьте фильтрацию по searchTerm
        const filteredFiles = filesInFolder.filter((file) =>
          file.toLowerCase().includes((dto.searchTerm || '').toLowerCase())
        )

        allFiles.push(
          ...filteredFiles.map((file) => ({
            name: file,
            url: join('/uploads', folder, file).replace(/\\/g, '/'),
          }))
        )
      })
    }

    return allFiles
  }

  async getDirectories() {
    return readdirSync('uploads', { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name)
  }

  async saveFiles(
    files: Express.Multer.File[],
    folder: string = 'images'
  ): Promise<FileResponse[]> {
    const uploadFolder = `${path}/uploads/${folder}`
    await ensureDir(uploadFolder)

    const res: FileResponse[] = await Promise.all(
      files.map(async (file) => {
        await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer)

        return {
          url: `/uploads/${folder}/${file.originalname}`,
          name: file.originalname,
        }
      })
    )

    return res
  }

  async addDirectory(dto: DirectoryDto) {
    const uploadFolder = `${path}/uploads/${dto.folder}`
    await ensureDir(uploadFolder)
  }

  async deleteDirectory(folder: string) {
    const folderPath = join(path, 'uploads', folder)

    await remove(folderPath)
  }

  async deleteFile(filePath: string) {
    const result = join(path, filePath)

    await remove(result)
  }
}
