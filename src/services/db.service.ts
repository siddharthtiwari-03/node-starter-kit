import { createPool } from "mysql2/promise";
import { envs } from "./environment.service.js";

export const pool = createPool({
    host: envs.db.host,
    database: envs.db.name,
    user: envs.db.user,
    password: envs.db.pass,
    connectionLimit: envs.db.connectionLimit
})