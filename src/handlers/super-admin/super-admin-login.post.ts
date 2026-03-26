import type { Request, Response } from "express"
import { envs } from "../../services/environment.service.js"
import { SuperAdmin } from "../../models/super-admin/super-admin.class.js"
import { prettyError } from "../../services/helper.service.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const superAdminLogin = async (req: Request, res: Response) => {
    console.info('Super admin login invoked!')

    // 1. extract payload from request body
    const { loginId, password, keepSigned } = req.body

    // 2. handle missing values in payload
    if (!loginId || !password) {
        const error = `Login Id and Password are required!`
        console.error(error)
        return res.status(400).json({ success: false, error })
    }

    // 3. execute query
    const found = await SuperAdmin.find({ where: { superEmail: `#${loginId}` } })

    // 4. handle if query fails
    if (!found.success) {
        console.error('error while super admin login', found)
        return res.status(400).json(prettyError(found))
    }

    // 5. handle if account not found
    if (!found.result.length) {
        console.error('Invalid super admin email')
        return res.status(401).json({ success: false, error: `Invalid login Id` })
    }

    // 6. unpack account to exclude password
    const { superPassword, ...account } = found.result[0]

    // 7. compare passwords
    const matched = await bcrypt.compare(password, superPassword)

    // 8. handle incorrect password
    if (!matched) {
        console.error('error while matching password')
        return res.status(403).json({ success: false, error: `Invalid login password` })
    }

    // 9. generate tokens
    const tokens = {
        refresher: jwt.sign({ superId: account.superId, accessRole: account.accessRole }, envs.jwt.refresh.secret, { expiresIn: keepSigned ? envs.jwt.refresh.longExpireIn : envs.jwt.refresh.expireIn } as jwt.SignOptions),
        accessor: jwt.sign({ superId: account.superId, accessRole: account.accessRole }, envs.jwt.access.secret, { expiresIn: envs.jwt.access.expireIn } as jwt.SignOptions)
    }

    const message = `Super admin login successful!`
    console.log(message)
    return res.status(200).json({ success: true, tokens, account, message })
}