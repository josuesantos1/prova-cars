import { Request, response, Response } from "express";
import { carRepository } from "../libraries/repositories/car";


export class CarsHandler {

    async create(req: Request, res: Response) {
        const { body } = req;

        try {
            const newCar = carRepository.create({
                                title: body.title,
                                description: body.description,
                                price: body.price,
                            });

            await carRepository.save(newCar)

            return res.status(201).json({
                message: 'car created successfully',
                data: newCar
            })

        } catch (e) {
            console.log(e);
            return res.status(500).json({
                message: 'Error creating',
            });
        }
    }

    async get(req: Request, res: Response) {
        const { car } = req.params

        console.log(car)

        try {
            const Car = await carRepository.findOneBy({
                id: Number(car)
            })

            if (!Car) {
                return res.status(404).json({
                    message: 'car not found'
                })
            }

            return res.status(200).json(Car)
        } catch (e) {
            console.log(e)
            return res.status(500).json({
                message: 'error while searching'
            })
        }
    }

    async update(req: Request, res: Response) {
        const { car } = req.params
        const { body } = req

        try {
            const carToUpdate = await carRepository.findOneBy({
                id: Number(car)
            })

            if (!carToUpdate) {
                return res.status(404).json({
                    message: 'car not found'
                })
            }

            carToUpdate.title = body.title || carToUpdate.title
            carToUpdate.description = body.description || carToUpdate.description
            carToUpdate.price = body.price || carToUpdate.price

            await carRepository.save(carToUpdate)

            return res.status(200).json({
                message: 'updated successfully',
                data: carToUpdate
            })
        } catch (e) {
            console.log(e)
            return res.status(500).json({
                message: 'error updating'
            })
        }
    }

    async delete(req: Request, res: Response) {
        const { car } = req.params

        try {
            const carToDelete = await carRepository.findOneBy({
                id: Number(car)
            })

            if (!carToDelete) {
                return res.status(404).json({
                    message: 'car not found'
                })
            }

            await carRepository.remove(carToDelete)

            return res.status(200).json({
                message: 'car deleted successfully'
            })
        } catch (e) {
            console.log(e)
            return res.status(500).json({
                message: 'error deleting car'
            })
        }
    }

}

