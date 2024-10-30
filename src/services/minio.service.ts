import * as Minio from "minio";
import logger from "../utils/logger";
import fs from 'fs';
import { UploadedObjectInfo } from "minio/dist/main/internal/type";
import internal from "stream";
import config from "../config/config";

export default class MinioService {
  private minioClient;

  constructor() {
    const {endPoint, port, accessKey, secretKey} = config.minio;
    this.minioClient = new Minio.Client({
      endPoint,
      port,
      useSSL: false,
      accessKey,
      secretKey,
    });
  }

  public async createBucket(bucketName: string): Promise<void> {
    const exist = await this.minioClient.bucketExists(bucketName);
    if (!exist) {
      try {
        await this.minioClient.makeBucket(bucketName);
        logger.info('Bucket created successfully.')
      } catch (err) {
        logger.error('Bucket created error: ', err)
      }
    }
  }

  public async uploadFile(file: Express.Multer.File, bucketName: string): Promise<UploadedObjectInfo | null> {
    const stream = fs.createReadStream(file.path);
    const metaData = {
      'Content-Type': file.mimetype
    };
    try {
      const result = await this.minioClient.putObject(bucketName, file.originalname, stream, file.size, metaData);
      logger.info('File uploaded succesfully.', result);
      return result;
    } catch (err) {
      logger.error('File uploaded error: ', err);
      return null;
    } finally {
      fs.unlinkSync(file.path);
    }
  }

  public downloadFile (filename: string, bucketName: string): Promise<internal.Readable> {
    return this.minioClient.getObject(bucketName, filename);
  }
}