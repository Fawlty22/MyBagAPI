import {BaseDto} from "../../common/base.dto";

export class DiscDto extends BaseDto {
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