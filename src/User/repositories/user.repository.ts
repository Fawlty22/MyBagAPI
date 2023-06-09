import {Inject, Injectable} from "@nestjs/common";
import {DataSource} from "typeorm";
import {User} from "../entities/user.entity";
import {BaseRepository} from "../../common/base.repository";
import {REQUEST} from "@nestjs/core";

@Injectable()
export class UserRepository extends BaseRepository<User>{
    constructor(
        @Inject(REQUEST) request,
        dataSource: DataSource
    ) {
        super(request, User, dataSource);
    }
}