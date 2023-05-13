import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiscModule } from './disc/disc/disc.module';

@Module({
  imports: [
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
    DiscModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
