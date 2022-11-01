import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne } from "typeorm"
import * as yup from 'yup';

import { Car } from "./car";

export const schema = yup.object().shape({
    first: yup.string().required(),
    last: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
});

export type user = {
    id: number
    first: string
    last: string
    email: string
    password: string
}

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first: string;

    @Column()
    last: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Car, car => car.owner)
    cars: Car[]
}


