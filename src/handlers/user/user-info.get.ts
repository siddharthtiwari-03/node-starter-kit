import { Request, Response } from "express";
import { User } from "../../models/user/user.class";
import { prettyError } from "../../services/helper.service";

export const getUserInfo = async (req: Request, res: Response) => {
    console.info(`Get user info invoked`)

    const { userId } = req.params

    const where = { userId }

    const found = await User.find({ where })

    if (!found.success) {
        console.error('error while getting user info', found)
        return res.status(400).json(prettyError(found))
    }

    if (!found.result.length) {
        console.error('invalid user Id')
        return res.status(400).json({ success: false, error: `Invalid user Id` })
    }

    return res.status(200).json({ success: true, result: found.result[0] })
}