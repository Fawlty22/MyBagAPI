import {BaseDto} from "../../common/base.dto";

export class UserDto extends BaseDto {
    username: string;
    email: string;
    password: string;
}