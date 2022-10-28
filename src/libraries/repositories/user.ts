import { AppDataSource } from "../../data-source";
import { User } from "../models/user";

export const userRepository = AppDataSource.getRepository(User)
