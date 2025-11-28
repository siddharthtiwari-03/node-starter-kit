import { Router } from "express"
import { userLogin } from "../handlers/user/user-login.post"
import { getUserList } from "../handlers/user/user-list.get"
import { validateUser } from "../validators/user.validator"
import { matchParamRegex } from "../services/helper.service"
import { updateUser } from "../handlers/user/user-update.put"

// self routes: Signup + Login + Forgot password + Refresh access token
const privateRoutes = Router({ mergeParams: true })

// Sharable view only routes for public access: Get list + Get info
const protectedRoutes = Router({ mergeParams: true })

// Shared editable routes: Update + Patch info + Reset password
const sharedRoutes = Router({ mergeParams: true })

// Parent level access: Create + Delete account
const reservedRoutes = Router({ mergeParams: true })

privateRoutes.post('/login', userLogin)

protectedRoutes.all('/:userId', matchParamRegex(['userId']), validateUser)
protectedRoutes.get('/', getUserList)
protectedRoutes.get('/:userId', getUserList)

sharedRoutes.all('/:userId', matchParamRegex(['userId']), validateUser)
sharedRoutes.put('/:userId', matchParamRegex(['userId']), updateUser)
sharedRoutes.patch('/:userId', matchParamRegex(['userId']), updateUser)

export const userRouter = { privateRoutes, protectedRoutes, sharedRoutes, reservedRoutes }