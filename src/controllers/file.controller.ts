import { Request, Response } from "express";
import FileService from "../services/file.service";
import { FileRequest } from "../interfaces/file.request.interface";
import MinioService from "../services/minio.service";
import config from "../config/config";
import logger from "../utils/logger";

export default class FileController {
  public async getAllFiles(req: Request, res: Response) {
    const fileService = new FileService();

    try {
      const files = await fileService.getAllFiles();
      res.json(files);
    } catch (error) {
      logger.error("Failed to fetch files: ", error);
      res.status(500).send("Server Error");
    }
  }
  public async getFile(req: Request, res: Response) {
    const { id } = req.params;
    const fileService = new FileService();
    const file = await fileService.getFile(Number(id));

    if (file) {
      const minio = new MinioService();
      try {
        const fileStream = await minio.downloadFile(
          file.filename,
          config.minio.bucketName
        );
        fileStream.pipe(res);
        return;
      } catch (err) {
        logger.error(
          `File with name: ${file.filename} not found in minio: `,
          err
        );
        res.sendStatus(404);
        return;
      }
    }

    const alternativeFile = await fileService.getFile(Number(id) + 1);
    if (alternativeFile) {
      const minio = new MinioService();
      try {
        const fileStream = await minio.downloadFile(
          alternativeFile.filename,
          config.minio.bucketName
        );
        fileStream.pipe(res);
        return;
      } catch (err) {
        logger.error(
          `File with name: ${alternativeFile.filename} not found in minio: `,
          err
        );
        res.sendStatus(404);
        return;
      }
    }

    res.status(404).send("File not found");
  }

  public async createFile(req: Request, res: Response) {
    const fileRequest = req as FileRequest;
    const fileService = new FileService();
    const data = await fileService.createFile(fileRequest.file);
    res.json(data);
  }
}
