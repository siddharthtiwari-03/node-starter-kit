import { type NextFunction, type Request, type Response } from "express"
import { User } from "../models/user/user.class.js"
import { prettyError } from "../services/helper.service.js"

export const validateUserInline = async (userId: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const response = await validateUser(userId)

        if (!response.success) return res.status(400).json(response)

        next()
    }
}

export const validateUser = async (userId: string) => {
    console.info('validate user invoked')

    const found = await User.find({ where: { userId: `#${userId}` } })

    if (!found.success) {
        console.error('error while validating user', found)
        return prettyError(found)
    }

    if (!found.result.length) {
        console.error('invalid user Id')
        return { success: false, error: `Invalid user Id` }
    }

    console.info('user valid!')
    return { success: true }
}