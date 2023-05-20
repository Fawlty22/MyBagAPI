import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigService} from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService)
  let AWS = require("aws-sdk");
  AWS.config.update({
    credentials: {
      accessKeyId: configService.get('accessKeyId'),
      secretAccessKey: configService.get('secretAccessKey'),
    },
    region: configService.get('region')
  });

  await app.listen(3000);
}
bootstrap();
