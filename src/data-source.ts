import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    entities: [`${__dirname}/**/models/*.ts`],
    migrations: [`${__dirname}/**/migrations/*.ts`],
    synchronize: true,
    logging: false,
})
