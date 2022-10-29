import * as dotenv from 'dotenv'
dotenv.config()

import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_NAME,
    password: "postgres",
    database: process.env.DATABASE,
    synchronize: true,
    logging: false,
    entities: [`${__dirname}/**/models/*.{ts,js}`],
	migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
})
