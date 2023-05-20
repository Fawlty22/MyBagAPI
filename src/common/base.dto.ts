import {Exclude} from "class-transformer";

export class BaseDto {

    id: number;

    active: number;

    @Exclude()
    deleted: Date;

}
