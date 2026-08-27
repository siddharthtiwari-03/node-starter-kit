import { Router } from "express"
import { superAdminLogin } from "../handlers/super-admin/super-admin-login.post.js"
import { userRouter } from "./user.router.js"
import { genHash } from "../handlers/_global/hash.get.js"
import { genSecret } from "../handlers/_global/secret.get.js"

export const globalRouter: Router = Router({ mergeParams: true })

globalRouter.get('/hash/:data', genHash)

globalRouter.get('/secret', genSecret)