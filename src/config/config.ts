import 'dotenv/config';
import { IConfig } from '../interfaces/config.interface';

const config: IConfig  = {
  port: Number(process.env.PORT) || 4000,
  appName: process.env.APP_NAME || 'file-service',
  db: {
    port: Number(process.env.DB_PORT) || 3306,
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USERNAME || '',
    password: process.env.DB_PASSWORD || '',
    name: process.env.DB_NAME || '',
  },
  minio: {
    port: Number(process.env.MINIO_PORT) || 9000,
    endPoint: process.env.MINIO_ENDPOINT || 'localhost',
    bucketName: process.env.MINIO_BUCKET_NAME || 'file-bucket',
    accessKey: process.env.MINIO_ACCESS_KEY || '',
    secretKey: process.env.MINIO_SECRET_KEY || '',
  }
}

export default config;