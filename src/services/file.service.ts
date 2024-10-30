import config from "../config/config";
import AppDataSource from "../config/db";
import { FileDto } from "../models/file/file.dto";
import { File } from "../models/file/file.entity";
import MinioService from "./minio.service";

export default class FileService {
  private fileRepository;
  constructor() {
    this.fileRepository = AppDataSource.getRepository(File);
  }

  public async getFile(id: number): Promise<File | null> {
    return this.fileRepository.findOneBy({ id });
  }
  public async getAllFiles() {
    const fileRepository = AppDataSource.getRepository(File);
    return await fileRepository.find();
  }
  public async createFile(file: Express.Multer.File): Promise<File> {
    const minio = new MinioService();
    await minio.uploadFile(file, config.minio.bucketName);
    const { originalname, mimetype, size } = file;
    const obj: FileDto = {
      filename: originalname,
      mimetype,
      size,
    };
    return this.fileRepository.save(obj);
  }
}
