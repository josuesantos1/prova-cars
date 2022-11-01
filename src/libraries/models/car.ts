import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, JoinColumn } from "typeorm"
import * as yup from 'yup';
import { User } from "./user";


export const schema = yup.object().shape({
    title: yup.string().required(),
    model: yup.string().required(),
    description: yup.string().required(),
    price: yup.number().required()
});

@Entity("cars")
export class Car {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    model: string;

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



