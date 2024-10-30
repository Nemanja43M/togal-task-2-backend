import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({})
  filename: string;

  @Column()
  mimetype: string;

  @Column()
  size: number;

  constructor(id: number, filename: string, size: number, mimetype: string) {
    this.id = id;
    this.filename = filename;
    this.mimetype = mimetype;
    this.size = size;
  }
}
