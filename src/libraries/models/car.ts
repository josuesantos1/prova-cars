import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, JoinColumn } from "typeorm"
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

    @ManyToOne(() => User, user => user.cars)
    @JoinColumn({
        name: 'car_id'
    })
    owner: User;
}



