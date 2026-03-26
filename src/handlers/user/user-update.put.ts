import type { Request, Response } from "express";
import { User } from "../../models/user/user.class.js";
import { prettyError } from "../../services/helper.service.js";

export const updateUser = async (req: Request, res: Response) => {
    console.info(`Update user invoked`)

    const { userId } = req.params as { userId: string | number }

    const data = req.body

    const updated = await User.save({ data, where: { userId } })

    if (!updated.success) {
        console.error('error while updating user', updated)
        if (updated.error.code == 'ER_DUP_ENTRY') {
            const [val, key] = updated.error.sqlMessage.replace('Duplicate entry ', '').replaceAll("'", '').replace(User.config.table + '.', '').replace('_UNIQUE', '').split(' for key ')
            return res.status(400).json({ success: false, error: `Action Denied! User with ${key}: ${val} already exists` })
        }
        return res.status(400).json(prettyError(updated))
    }

    return res.status(200).json({ ...updated, message: `User updated successfully!` })
}