import { UnSQL } from "unsql";
import { envs } from "../../services/environment.service.js";
import { pool } from "../../services/db.service.js";

export class User extends UnSQL {

    static config: typeof UnSQL.config = {
        table: envs.tables.user.account,
        pool,
        dialect: 'mysql',
        devMode: false,
        safeMode: true
    }

}