import { Request, Response } from "express"
import crypto from 'node:crypto'

export const genSecret = async (req: Request, res: Response) => {
    console.info('generating secret invoked')

    const secret = crypto.randomBytes(64).toString('hex')
    console.log('secret', secret)
    return res.status(200).json({ secret })

}