import { Router, type NextFunction, type Request, type Response } from "express";
import { userRouter } from "./routers/user.router.js";
import { genHash } from "./handlers/_global/hash.get.js";
import { genSecret } from "./handlers/_global/secret.get.js";

export const appRouter: Router = Router({ mergeParams: true })

appRouter.get('/hash/:data', genHash)

appRouter.get('/secret', genSecret)

appRouter.use('/users', userRouter.privateRoutes, userRouter.protectedRoutes)

appRouter.all('/*x', (req: Request, res: Response, next: NextFunction) => {
    console.log('not found')
    return res.status(404).json({ message: 'page not found!' })
})