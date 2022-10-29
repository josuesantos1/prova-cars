import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export class Auth {
    async authorization(req: Request, res: Response, next: NextFunction) {
        const { authorization } = req.headers

        if (!authorization) {
            return res.status(403).json(
                {
                    message: 'not authorized'
                }
            )
        }

        const [, token] = authorization.split(' ')

        try {
            console.log(token)
            await jwt.verify(token, String(process.env.APP_PASS))
            next()
        } catch (e) {
            console.log(e)
            return res.status(500).json({
                message: 'error verifying token'
            })
        }
    }
}

