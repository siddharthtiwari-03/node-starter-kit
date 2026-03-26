import type { Request, Response } from "express";
import { User } from "../../models/user/user.class.js";
import { applyFilters, applyPagination, applyRange, applySearch, applySort, prettyError } from "../../services/helper.service.js";

export const getUserList = async (req: Request, res: Response) => {
    console.info(`Get user list invoked`)

    const { page = '0', pageSize, search, sort = 'latest', range, ...filters } = req.query

    const found = await User.find({
        where: {
            ...applySearch(search, ['firstName', 'lastName', 'userDes', 'userEmail']),
            ...applyRange(range, 'firstName'),
            ...applyFilters(filters)
        },
        ...applyPagination(page, pageSize),
        ...applySort(sort, 'firstName', 'userId')
    })

    if (!found.success) {
        console.error('error while getting user list', found)
        return res.status(400).json(prettyError(found))
    }

    return res.status(200).json(found)
}