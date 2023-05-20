import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiscModule } from './disc/disc.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginModule } from './login/login.module';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {OrmService} from "./config/orm.service";
import {loadExternalConfigs} from "./config/configuration";

@Module({
  imports: [
    LoginModule,
    ConfigModule.forRoot({
      load: [loadExternalConfigs],
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'mariadb',
      host: 'mybag-dev-database.cab78zdnf7fa.us-east-1.rds.amazonaws.com',
      port: 3306,
      username: 'admin',
      password: 'MyBagDB2023$',
      database: '',
      synchronize: true,
      logging: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
    }),
    TypeOrmModule.forRootAsync({useClass: OrmService, inject: [ConfigService]}),
    DiscModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
