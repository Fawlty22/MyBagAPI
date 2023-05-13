import {Entity, Column, OneToOne, JoinColumn} from 'typeorm';

@Entity()
export class Disc {
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
}