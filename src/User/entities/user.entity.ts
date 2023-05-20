import {Entity, Column, OneToMany} from 'typeorm';
import {Disc} from "../../Disc/entities/disc.entity";
import {BaseEntity} from "../../common/base.entity";

@Entity()
export class User extends BaseEntity {
    @Column()
    username: string;

    @Column()
    email: string;

    @Column({name: 'first_name'})
    firstName: string;

    @Column({name: 'last_name'})
    lastName: string;

    @Column({name: 'cognito_id'})
    cognitoId: string;

    @OneToMany(() => Disc, (disc) => disc.user, {
        cascade: ["insert", "update", "soft-remove"],
        onDelete: 'CASCADE',
        eager: true
    })
    discs: Disc[]
}