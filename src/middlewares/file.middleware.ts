import { Request, Response, NextFunction } from 'express';

const supportedTypes = ['image/png', 'image/jpg', 'image/jpeg'];

export const fileMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.file) {
    res.status(400).json({
      message: 'File is required.'
    })
    return;
  } else if (!supportedTypes.includes(req.file.mimetype)) {
    res.status(400).json({
      message: 'Unsupported file type.'
    })
    return;
  }
  next()
}
