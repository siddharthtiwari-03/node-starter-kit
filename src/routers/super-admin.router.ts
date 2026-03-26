import { Router } from "express"
import { superAdminLogin } from "../handlers/super-admin/super-admin-login.post.js"
import { userRouter } from "./user.router.js"

const privateRoutes: Router = Router({ mergeParams: true })

const protectedRoutes: Router = Router({ mergeParams: true })

const sharedRoutes: Router = Router({ mergeParams: true })

const reservedRoutes: Router = Router({ mergeParams: true })

privateRoutes.post('/login', superAdminLogin)
privateRoutes.use('/users', userRouter.reservedRoutes, userRouter.sharedRoutes)

export const superRouter = { privateRoutes, protectedRoutes, sharedRoutes, reservedRoutes }