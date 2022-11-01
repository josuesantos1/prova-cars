import { Request, Response } from "express";
import { Storage } from "../libraries/upload/storage";

export class FilesHandler {
    async upload(req: Request, res: Response) {
        const file = req.file as Express.Multer.File;

        const storage = new Storage()
        await storage.save(file).then(file => {
            return res.status(201).json({
                message: 'uploaded',
                file: file
            })
        }).catch(e => {
            console.log(e)
            return res.status(500).json({
                error: 'error'
            })
        })
    }

    async view(req: Request, res: Response) {
        const { file } = req.params

        const storage = new Storage()

        const key = await storage.view(file)

        return res.json({key})
    }
}

