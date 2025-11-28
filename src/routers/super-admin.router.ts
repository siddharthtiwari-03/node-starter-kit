import { Router } from "express"
import { superAdminLogin } from "../handlers/super-admin/super-admin-login.post"
import { userRouter } from "./user.router"

const privateRoutes = Router({ mergeParams: true })

const protectedRoutes = Router({ mergeParams: true })

const sharedRoutes = Router({ mergeParams: true })

const reservedRoutes = Router({ mergeParams: true })

privateRoutes.post('/login', superAdminLogin)
privateRoutes.use('/users', userRouter.reservedRoutes, userRouter.sharedRoutes)

export const superRouter = { privateRoutes, protectedRoutes, sharedRoutes, reservedRoutes }