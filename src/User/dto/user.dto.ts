import {BaseDto} from "../../common/base.dto";
import {Exclude} from "class-transformer";

export class UserDto extends BaseDto {
    username: string;
    email: string
    firstName: string
    lastName: string
    description: string
    @Exclude()
    cognitoId: string;
}