import { Request, Response } from "express";
import { User } from "../../models/user/user.class";
import { prettyError } from "../../services/helper.service";

export const updateUser = async (req: Request, res: Response) => {
    console.info(`Update user invoked`)

    const { userId } = req.params

    const data = req.body

    const updated = await User.save({ data, where: { userId } })

    if (!updated.success) {
        console.error('error while updating user', updated)
        return res.status(400).json(prettyError(updated))
    }

    return res.status(200).json({ ...updated, message: `User updated successfully!` })
}