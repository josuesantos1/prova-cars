import { Request, Response } from "express";
import { userRepository } from "../libraries/repositories/user";

export class UsersHandler {

    async create(req: Request, res: Response) {
        const { body } = req;

        try {
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
            return res.status(400).json({
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

        }
    }

    async update(req: Request, res: Response) {
        const { user } = req.params
        const { body } = req


    }
}
