import dotenv from 'dotenv'

dotenv.config()

if (process.env.NODE_ENV == 'dev') {
    const parsed = dotenv.config({ path: ['.env.dev'], override: true })
    if (process.env.SYSTEM_ENV_LOGS == 'true') console.log('env parsed', parsed)
}
else if (process.env.NODE_ENV == 'stage') {
    const parsed = dotenv.config({ path: ['.env.stage'], override: true })
    if (process.env.SYSTEM_ENV_LOGS == 'true') console.log('env parsed', parsed)
}
else if (process.env.NODE_ENV == 'prod') {
    const parsed = dotenv.config({ path: ['.env.prod'], override: true })
    if (process.env.SYSTEM_ENV_LOGS == 'true') console.log('env parsed', parsed)
}