import {Injectable} from "@nestjs/common";
import {TypeOrmModuleOptions, TypeOrmOptionsFactory} from "@nestjs/typeorm";
import {ConfigService} from "@nestjs/config";


@Injectable()
export class OrmService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService) {
    }

    async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
        return new Promise((resolve, reject) => {
            resolve({
                type: 'mysql',
                host: this.configService.get('dbHost'),
                port: +this.configService.get('dbPort'),
                username: this.configService.get('dbUsername'),
                password: this.configService.get('dbPassword'),
                database: this.configService.get('dbName'),
                autoLoadEntities: true,
            });
        });
    }
}