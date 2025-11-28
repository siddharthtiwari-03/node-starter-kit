import { Request, Response } from "express";
import { User } from "../../models/user/user.class";
import { prettyError } from "../../services/helper.service";

export const patchUser = async (req: Request, res: Response) => {
    console.info(`patch user invoked`)

    const { userId } = req.params

    const data = req.body

    const patched = await User.save({ data, where: { userId } })

    if (!patched.success) {
        console.error('error while patching user info', patched)
        return res.status(400).json(prettyError(patched))
    }

    return res.status(200).json({ ...patched, message: `User patched successfully!` })
}