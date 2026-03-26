import './services/env-config.service.js'

import express from 'express'
import compression from 'compression'
import cors from 'cors'
import helmet from 'helmet'

import os from 'node:os'
import cluster from 'node:cluster'

import { envs } from './services/environment.service.js'
import { appRouter } from './app.router.js'

const availableCores = os.availableParallelism()


if (cluster.isPrimary && envs.use_cluster_module === 'true') {

    for (let i = 0; i < availableCores; i++) {
        const clusterWorker = cluster.fork()
        clusterWorker.on('exit', (code, signal) => {
            if (signal) {
                console.warn(`cluster worker was killed by signal: ${signal}`)
            } else if (code !== 0) {
                console.warn(`cluster worker exited with error code: ${code}`)
            }
        })
    }

} else {

    const app = express()

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cors())
    app.use(helmet())
    app.use(compression())

    app.use(appRouter)

    app.listen(envs.port, () => console.log(`Server started listening at: ${envs.port}`))

}