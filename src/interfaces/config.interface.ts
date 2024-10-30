export interface IConfig {
  port: number;
  appName: string;
  db: {
    port: number;
    host: string;
    username: string;
    password: string;
    name: string;
  };
  minio: {
    bucketName: string;
    endPoint: string,
    port: number,
    accessKey: string,
    secretKey: string,
  }
}