import { Request, response, Response } from "express";
import { user } from "../libraries/models/user";
import { userRepository } from "../libraries/repositories/user";

export class UsersHandler {

    async create(req: Request, res: Response) {
        const { body } = req;

        try {

            // TODO: verify that not already existing

            const newUser = userRepository.create({
                                first: body.first,
                                last: body.last,
                                email: body.email,
                                password: body.password
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

            userToUpdate.email = body.email || userToUpdate.email
            userToUpdate.password = body.password || userToUpdate.password
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


}
