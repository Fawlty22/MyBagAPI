import {Injectable} from "@nestjs/common";
import { DataSource, EntityTarget, Repository } from "typeorm";
import {BaseEntity} from "./base.entity";
import { SaveOptions } from "typeorm/repository/SaveOptions";

@Injectable()
export class BaseRepository<T extends BaseEntity> extends Repository<T> {
    entity: EntityTarget<T>;

    constructor(private request, entity, protected dataSource: DataSource) {
        super(entity, dataSource.createEntityManager());
        this.entity = entity;
    }


    async save(entity: any | any[], options?: SaveOptions): Promise<any | any[]> {
        const _entity: any = this.prepareEntity(entity);
        Object.assign(entity, await super.save(_entity, options));
        return entity;
    }


    async update(criteria: any, entity: any): Promise<any | any[]> {
        const _entity: any = this.prepareEntity(entity);
        Object.assign(entity, await super.update(criteria, _entity));
        return entity;
    }

    prepareEntity(entity: any){
        this.request._functionName = BaseRepository.getFunctionName();
        const _entity: any = this.manager.getRepository(this.entity).create(entity);
        if(Array.isArray(_entity)){
            _entity.forEach(item => {
                item._userEmail = this.request._userEmail
                item._functionName = this.request._functionName;
            });
        } else {
            _entity._userEmail = this.request._userEmail;
            _entity._functionName = this.request._functionName;
        }
        return _entity;
    }

    private static getFunctionName(): string {
        Error.stackTraceLimit = Infinity;
        const error = new Error();
        // use the Error stack trace to get the name of the calling function
        const stackTrace = error.stack;
        const stackTraceLines = stackTrace.split('\n');

        // find the line with the calling function name
        const functionNameLine = stackTraceLines.find((line) =>
            line.includes('Service.')
        );

        // extract the function name from the line
        return functionNameLine?.trim()?.split(' ')?.[1];
    }

}
