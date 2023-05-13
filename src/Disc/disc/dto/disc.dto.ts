import {Column} from "typeorm";

export class DiscDto {
    brand: string;
    name: string;
    speed: string;
    glide:string;
    turn: string;
    fade: string;
    inBag: boolean;
    flightPath:string;
    flightType:string;
}