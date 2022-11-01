import { Request, response, Response } from "express";
import * as bcrypt from "bcrypt";

import { user, schema } from "../libraries/models/user";
import { userRepository } from "../libraries/repositories/user";
import { Auth } from "../libraries/security/auth";

export class UsersHandler {

    async create(req: Request, res: Response) {
        const { body } = req;

        try {
            await schema.validate(body)
        } catch(e) {
            console.log(e)
            return res.status(400).json({message: e})
        }

        try {
            const exists = await userRepository.findOneBy({
                email: body.email
            })

            if (exists) {
                return res.status(409).json({
                    message: 'user already exists'
                })
            }

            const newUser = userRepository.create({
                                first: body.first,
                                last: body.last,
                                email: body.email,
                                password: bcrypt.hashSync(body.password, 10)
                            });

            await userRepository.save(newUser)

            const auth = new Auth()

            const sign = await auth.auth(body.email, body.password);

            return res.status(201).json({
                message: 'user created successfully',
                data: sign.data
            })

        } catch (e) {
            console.log(e);
            return res.status(500).json({
                message: 'Error creating',
            });
        }
    }

    async get(req: Request, res: Response) {
        const { authorization } = req.headers;

        try {
            const User = await userRepository.findOneBy({
                email: authorization,
            })

            if (!User) {
                return res.status(404).json({
                    message: 'User not found'
                })
            }

            User.password = ''
            return res.status(200).json(User)
        } catch (e) {
            console.log(e)
            return res.status(500).json({
                message: 'error while searching'
            })
        }
    }

    async update(req: Request, res: Response) {
        const { body, headers } = req

        try {
            const userToUpdate = await userRepository.findOneBy({
                email: headers.authorization
            }) as user

            if (!userToUpdate) {
                return res.status(404).json({
                    message: 'user not found'
                })
            }

            const pass = bcrypt.hashSync(body.password || userToUpdate.password, 10)

            userToUpdate.email = body.email || userToUpdate.email
            userToUpdate.password = pass
            userToUpdate.first = body.first || userToUpdate.first
            userToUpdate.last = body.last || userToUpdate.last

            await userRepository.save(userToUpdate)
            userToUpdate.password = ''

            return res.status(200).json({
                message: 'updated successfully',
                data: userToUpdate
            })
        } catch (e) {
            console.log(e)
            return res.status(500).json({
                message: 'error updating'
            })
        }
    }

    async delete(req: Request, res: Response) {
        const { headers } = req

        try {
            const userToDelete = await userRepository.findOneBy({
                email: headers.authorization
            })

            if (!userToDelete) {
                return res.status(404).json({
                    message: 'user not found'
                })
            }

            await userRepository.remove(userToDelete)

            return res.status(200).json({
                message: 'user deleted successfully'
            })
        } catch (e) {
            console.log(e)
            return res.status(500).json({
                message: 'error deleting user'
            })
        }
    }

    async login(req: Request, res: Response) {
        const {email, password} = req.body;

        const auth = new Auth()

        const sign = await auth.auth(email, password);

        return res.status(sign.status).json(sign.data)
    }
}
