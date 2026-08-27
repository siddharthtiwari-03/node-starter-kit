import type { Request, Response } from "express"
import bcrypt from 'bcrypt'

export const genHash = async (req: Request, res: Response) => {
    const { data } = req.params as { data: string }

    console.info('get hash invoked:', data)

    try {
        const hashed = await bcrypt.hash(data, 10)
        console.info('hashed data:', hashed)
        return res.status(200).json({ hashed })

    } catch (error: any) {
        console.error('error while hashing', error)
        return res.status(400).json({ success: false, error: error.message || error })
    }
}