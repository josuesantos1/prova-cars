import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { user } from "../models/user";

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
            await jwt.verify(token, String(process.env.APP_PASS))

            const token_decoded = jwt.decode(token) as user

            req.headers.authorization = token_decoded.email

            next()
        } catch (e) {
            console.log(e)
            return res.status(500).json({
                message: 'error verifying token'
            })
        }
    }
}

