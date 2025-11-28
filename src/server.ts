import './services/env-config.service'

import express from 'express'
import compression from 'compression'
import cors from 'cors'

import { envs } from './services/environment.service'
import { appRouter } from './app.router'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(compression())

app.use(appRouter)

app.listen(envs.port, () => console.log(`Server started listening at: ${envs.port}`))