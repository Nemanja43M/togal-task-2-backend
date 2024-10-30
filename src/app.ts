import express, { Application } from "express";
import cors from "cors";
import AppDataSource from "./config/db";
import logger from "./utils/logger";
import config from "./config/config";
import FileRouter from "./routes/file.router";
import MinioService from "./services/minio.service";

export default class App {
  private app: Application;
  constructor() {
    this.app = express();
    this.app.use(
      cors({
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
      })
    );
  }

  private async connectDb(): Promise<void> {
    try {
      await AppDataSource.initialize();
      logger.info("Connected to database");
    } catch (error) {
      logger.error("Database connection failed", error);
    }
  }

  private startServer(): void {
    this.app.listen(config.port, () => {
      logger.info(`Server running on port ${config.port}`);
    });
  }

  private initRoutes(): void {
    const fileRoutes = new FileRouter();
    this.app.use(fileRoutes.router);
  }

  private async createBucket(): Promise<void> {
    const minio = new MinioService();
    await minio.createBucket(config.minio.bucketName);
  }

  public async init() {
    this.connectDb();
    this.startServer();
    this.initRoutes();
    this.createBucket();
  }
}
