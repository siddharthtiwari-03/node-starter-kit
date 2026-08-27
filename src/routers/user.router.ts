import { Router } from "express"
import { userLogin } from "../handlers/user/user-login.post.js"
import { getUserList } from "../handlers/user/user-list.get.js"
import { validateUser } from "../validators/user.validator.js"
import { matchParamRegex, registerParamValidator } from "../services/helper.service.js"
import { updateUser } from "../handlers/user/user-update.put.js"
import { getUserInfo } from "../handlers/user/user-info.get.js"
import { envs } from "../services/environment.service.js"

// self routes: Signup + Login + Forgot password + Refresh access token
const privateRoutes: Router = Router({ mergeParams: true })

// Sharable view only routes for public access: Get list + Get info
const protectedRoutes: Router = Router({ mergeParams: true })

// Shared editable routes: Update + Patch info + Reset password
const sharedRoutes: Router = Router({ mergeParams: true })

// Parent level access: Create + Delete account
const reservedRoutes: Router = Router({ mergeParams: true })

privateRoutes.post('/login', userLogin)

protectedRoutes.param('userId', registerParamValidator())

sharedRoutes.param('userId', registerParamValidator())

protectedRoutes.all('/:userId', validateUser)
protectedRoutes.get('/', getUserList)
protectedRoutes.get('/:userId', getUserInfo)

sharedRoutes.all('/:userId', validateUser)
sharedRoutes.put('/:userId', updateUser)
sharedRoutes.patch('/:userId', updateUser)

export const userRouter = { privateRoutes, protectedRoutes, sharedRoutes, reservedRoutes }