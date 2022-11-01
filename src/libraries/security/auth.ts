import * as bcrypt from "bcrypt";
import * as jwt from 'jsonwebtoken'

import { userRepository } from "../repositories/user"

export class Auth {
    async auth(email: string, password: string) {

        console.log(email)
        try {
            const user = await userRepository.findOneBy({
                email: email,
            })

            if (!user) {
                return {
                    status: 401,
                        data: {
                        message: 'email or password incorrect'
                    }
                }
            }

            if (await bcrypt.compare(password, user.password)) {
                const token = jwt.sign({...user}, String(process.env.APP_PASS), {
                    expiresIn: 604800,
                })

                return {
                    status: 200,
                    data: {
                        ...user,
                        token
                    }
                }
            }

            return {
                status: 401,
                data: {
                    message: 'email or password incorrect'
                }
            }
        } catch (e) {
            console.log(e)
            return {
                status: 500,
                data: {
                    message: 'error while login'
                }
            }
        }
    }
}
