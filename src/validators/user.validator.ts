import { NextFunction, Request, Response } from "express"
import { User } from "../models/user/user.class"
import { prettyError } from "../services/helper.service"

export const validateUserInline = async (userId: string | number) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const response = await validateUser(userId)

        if (!response.success) return res.status(400).json(response)

        next()
    }
}

export const validateUser = async (userId: string | number) => {
    console.info('validate user invoked')

    const found = await User.find({ where: { userId } })

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