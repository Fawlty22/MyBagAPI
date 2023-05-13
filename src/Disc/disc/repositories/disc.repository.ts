import {Injectable} from "@nestjs/common";
import {DataSource} from "typeorm";
import {Disc} from "../entities/disc.entity";

@Injectable()
export class DiscRepository {
    constructor(
        dataSource: DataSource
    ) {
        // super(Disc, dataSource);
    }
}