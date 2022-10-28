import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm"
import { User } from "./user";


@Entity("cars")
export class Car {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({type: 'text'})
    description: string;

    @Column()
    price: number;

    // @OneToOne()
    // owner: User;
}



