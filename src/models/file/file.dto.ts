import { IsString, IsInt } from "class-validator";
import { IFile } from "../../interfaces/file.interface";

export class FileDto {
  @IsInt()
  id?: number;

  @IsString({})
  filename: string;

  @IsString()
  mimetype: string;

  @IsInt()
  size: number;

  constructor(obj: IFile) {
    this.filename = obj.filename;
    this.mimetype = obj.mimetype;
    this.size = obj.size;
  }
}
