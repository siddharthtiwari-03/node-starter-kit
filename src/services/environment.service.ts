export const envs = {

    port: process.env.PORT,

    systemLogs: process.env.SYSTEM_LOGS || 'false',

    use_cluster_module: process.env.USER_CLUSTER_MODULE || 'false',

    node_env: process.env.NODE_ENV,

    uuid_regex: '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}',

    uuid_regex_pattern: /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[89AB][a-f0-9]{3}-[a-f0-9]{12}$/i,

    db: {
        host: process.env.DB_HOST || '',
        name: process.env.DB_NAME || '',
        user: process.env.DB_USER || '',
        pass: process.env.DB_PASS || '',
        port: process.env.DB_PORT || '',
        connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT || '5'),
    },

    sortOrders: {
        az: 'asc',
        za: 'desc',
        asc: 'asc',
        desc: 'desc',
        oldest: 'asc',
        latest: 'desc',
        lowest: 'asc',
        highest: 'desc',
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

    redis: {
        cacheName: {
            username: process.env.REDIS_CACHE_USERNAME || '',
            password: process.env.REDIS_CACHE_PASSWORD || '',
            host: process.env.REDIS_CACHE_HOST || '',
            port: process.env.REDIS_CACHE_PORT || '',
        }
    },

} as const