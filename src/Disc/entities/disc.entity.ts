import {Entity, Column, ManyToOne} from 'typeorm';
import {User} from "../../User/entities/user.entity";
import {BaseEntity} from "../../common/base.entity";

@Entity()
export class Disc extends BaseEntity {
    @Column()
    brand: string;

    @Column()
    name: string;

    @Column()
    speed: string;

    @Column()
    glide:string;

    @Column()
    turn: string;

    @Column()
    fade: string;

    @Column({name: 'in_bag'})
    inBag: boolean;

    @Column({name: 'flight_path'})
    flightPath:string;

    @Column({name: 'flight_type'})
    flightType:string;

    @ManyToOne(() => User, (user) => user.discs)
    user: User;
}