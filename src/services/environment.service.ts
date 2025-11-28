export const envs = {

    port: process.env.PORT,

    systemLogs: process.env.SYSTEM_LOGS || 'false',

    db: {
        host: process.env.DB_HOST || '',
        name: process.env.DB_NAME || '',
        user: process.env.DB_USER || '',
        pass: process.env.DB_PASS || '',
        port: process.env.DB_PORT || '',
        connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT || '5'),
    },

    tables: {

        user: {
            account: process.env.DB_TABLE_USERS || '',
        },

        superAdmin: {
            account: process.env.DB_TABLE_SUPER_ADMINS || '',
        },

    },

    jwt: {
        refresh: {
            secret: process.env.JWT_REFRESH_SECRET || '',
            expireIn: process.env.JWT_REFRESH_EXPIRE_IN || '1d',
            longExpireIn: process.env.JWT_REFRESH_LONG_EXPIRE_IN || '6M',
        },
        access: {
            secret: process.env.JWT_ACCESS_SECRET || '',
            expireIn: process.env.JWT_ACCESS_EXPIRE_IN || '15m'
        },
    },

} as const