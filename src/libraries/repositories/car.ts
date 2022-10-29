import { AppDataSource } from "../../data-source";
import { Car } from "../models/car";

export const carRepository = AppDataSource.getRepository(Car)
