import { Router } from "express";
import FileController from "../controllers/file.controller";
import multer from "multer";
import { fileMiddleware } from "../middlewares/file.middleware";

const upload = multer({ dest: "uploads/" });

export default class FileRouter {
  public router;
  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  public initializeRoutes() {
    const fileController = new FileController();
    this.router.get("/file", fileController.getAllFiles);
    this.router.get("/file/:id", fileController.getFile);
    this.router.post(
      "/file",
      upload.single("image"),
      fileMiddleware,
      fileController.createFile
    );
  }
}
