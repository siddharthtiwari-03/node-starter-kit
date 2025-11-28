import { Router } from "express";
import { userRouter } from "./routers/user.router";
import { genHash } from "./handlers/_global/hash.get";
import { genSecret } from "./handlers/_global/secret.get";

export const appRouter = Router({ mergeParams: true })

appRouter.get('/hash/:data', genHash)

appRouter.get('/secret', genSecret)

appRouter.use('/users', userRouter.privateRoutes, userRouter.protectedRoutes)