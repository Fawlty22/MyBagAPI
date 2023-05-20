import {Injectable, NestInterceptor, ExecutionContext} from '@nestjs/common';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {plainToInstance} from 'class-transformer';
import {CallHandler} from "@nestjs/common/interfaces/features/nest-interceptor.interface";

interface ClassType<T> {
    new(): T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<Partial<T>, T> {

    constructor(private readonly classType: ClassType<T>) {
    }

    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<T> {
        return next.handle().pipe(map(
            data => plainToInstance(this.classType, data)
        ));
    }

}