import {
    Column,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn
} from "typeorm";

@Entity()
export class BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    active: number;

    @DeleteDateColumn()
    deleted: Date;
}
