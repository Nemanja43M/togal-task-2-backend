import "reflect-metadata"
import { DataSource } from "typeorm";
import {File} from "../models/file/file.entity";
import config from "./config";

const AppDataSource = new DataSource({
    type: "mysql",
    host: config.db.host,
    port: config.db.port,
    username: config.db.username,
    password: config.db.password,
    database: config.db.name,
    entities: [File],
    synchronize: true,
    logging: false,
})

export default AppDataSource;