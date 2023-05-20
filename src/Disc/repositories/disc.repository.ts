import {Inject, Injectable} from "@nestjs/common";
import {DataSource} from "typeorm";
import {Disc} from "../entities/disc.entity";
import {BaseRepository} from "../../common/base.repository";
import {REQUEST} from "@nestjs/core";

@Injectable()
export class DiscRepository extends BaseRepository<Disc>{
    constructor(
        @Inject(REQUEST) request,
        dataSource: DataSource
    ) {
        super(request, Disc, dataSource);
    }
}