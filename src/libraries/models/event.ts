import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn } from "typeorm"


@Entity("events")
export class Event {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    entity: string

    @Column()
    key: string

    @Column({type: "jsonb"})
    data: number;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;
}



