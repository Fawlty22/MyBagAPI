import {Entity, Column, OneToOne, JoinColumn, OneToMany} from 'typeorm';
import {Disc} from "../../Disc/disc/entities/disc.entity";

@Entity()
export class User {
    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Disc, (disc) => disc.user, {
        cascade: ["insert", "update", "soft-remove"],
        onDelete: 'CASCADE',
        eager: true
    })
    discs: Disc[]
}