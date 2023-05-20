import {Entity, Column, OneToMany} from 'typeorm';
import {Disc} from "../../Disc/entities/disc.entity";
import {BaseEntity} from "../../common/base.entity";

@Entity()
export class User extends BaseEntity {
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