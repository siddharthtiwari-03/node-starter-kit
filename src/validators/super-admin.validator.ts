import { type NextFunction, type Request, type Response } from "express"
import { prettyError } from "../services/helper.service.js"
import { SuperAdmin } from "../models/super-admin/super-admin.class.js"

export const validateSuperAdminInline = async (superId: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const response = await validateSuperAdmin(superId)

        if (!response.success) return res.status(400).json(response)

        next()
    }
}

export const validateSuperAdmin = async (superId: string) => {
    console.info('validate super admin invoked')

    const found = await SuperAdmin.find({ where: { superId: `#${superId}` } })

    if (!found.success) {
        console.error('error while validating super admin', found)
        return prettyError(found)
    }

    if (!found.result.length) {
        console.error('invalid super admin Id')
        return { success: false, error: `Invalid super admin Id` }
    }

    console.info('super admin valid!')
    return { success: true }
}