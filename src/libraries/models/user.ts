import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne } from "typeorm"
import { Car } from "./car";

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


