import Redis from 'redis'
import { envs } from './environment.service.js'

const clients = new Map()

export const getRedisClient = (name: keyof typeof envs.redis = 'cacheName', region?: string,) => {
    if (clients.has(name)) return clients.get(name)

    const { } = envs.redis[name]
}