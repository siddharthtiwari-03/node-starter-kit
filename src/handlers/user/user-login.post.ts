import type { Request, Response } from "express"
import { envs } from "../../services/environment.service.js"
import { User } from "../../models/user/user.class.js"
import { prettyError } from "../../services/helper.service.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const userLogin = async (req: Request, res: Response) => {
    console.info('user login invoked!')

    // 1. extract payload from request body
    const { loginId, password, keepSigned } = req.body

    // 2. handle missing values in payload
    if (!loginId || !password) {
        const error = `Login Id and Password are required!`
        console.error(error)
        return res.status(400).json({ success: false, error })
    }

    // 3. execute query
    const found = await User.find({ where: { userEmail: `#${loginId}` } })

    // 4. handle if query fails
    if (!found.success) {
        console.error('error while user login', found)
        return res.status(400).json(prettyError(found))
    }

    // 5. handle if account not found
    if (!found.result.length) {
        console.error('Invalid user email')
        return res.status(401).json({ success: false, error: `Invalid login Id` })
    }

    // 6. unpack account to exclude password
    const { userPassword, ...account } = found.result[0]

    // 7. compare passwords
    const matched = await bcrypt.compare(password, userPassword)

    // 8. handle incorrect password
    if (!matched) {
        console.error('error while matching password')
        return res.status(403).json({ success: false, error: `Invalid login password` })
    }

    // 9. generate tokens
    const tokens = {
        refresher: jwt.sign({ userId: account.userId, accessRole: account.accessRole }, envs.jwt.refresh.secret, { expiresIn: keepSigned ? envs.jwt.refresh.longExpireIn : envs.jwt.refresh.expireIn } as jwt.SignOptions),
        accessor: jwt.sign({ userId: account.userId, accessRole: account.accessRole }, envs.jwt.access.secret, { expiresIn: envs.jwt.access.expireIn } as jwt.SignOptions)
    }

    const message = `User login successful!`
    console.log(message)
    return res.status(200).json({ success: true, tokens, account, message })
}