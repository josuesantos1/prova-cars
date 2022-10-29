import { Request, response, Response } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from 'jsonwebtoken'

import { user } from "../libraries/models/user";
import { userRepository } from "../libraries/repositories/user";

export class UsersHandler {

    async create(req: Request, res: Response) {
        const { body } = req;

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

            return res.status(201).json({
                message: 'user created successfully',
                data: newUser
            })

        } catch (e) {
            console.log(e);
            return res.status(500).json({
                message: 'Error creating',
            });
        }
    }

    async get(req: Request, res: Response) {
        const { user } = req.params

        console.log(user)

        try {
            const User = await userRepository.findOneBy({
                id: Number(user)
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
        const { user } = req.params
        const { body } = req

        try {
            const userToUpdate = await userRepository.findOneBy({
                id: Number(user)
            }) as user

            if (!userToUpdate) {
                return res.status(404).json({
                    message: 'user not found'
                })
            }

            const pass = bcrypt.hashSync(body.password, 10) || bcrypt.hashSync(userToUpdate.password, 10)

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
        const { user } = req.params

        try {
            const userToDelete = await userRepository.findOneBy({
                id: Number(user)
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

        try {
            const user = await userRepository.findOneBy({
                email: email,
            })
            console.log(user)
            if (!user) {
                return res.status(400).json({
                    message: 'email or password incorrect'
                })
            }


            if (await bcrypt.compare(password, user.password)) {
                const token = jwt.sign({...user}, String(process.env.APP_PASS), {
                    expiresIn: 604800,
                })

                return res.status(200).json({
                    ...user,
                    token
                })
            }
            console.log(user.password)

            return res.status(400).json({
                message: 'email or password incorrect'
            })
        } catch (e) {
            console.log(e)
            return res.status(400).json({
                message: 'error while login'
            })
        }
    }
}
