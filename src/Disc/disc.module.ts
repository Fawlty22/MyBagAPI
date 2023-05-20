import { Module } from '@nestjs/common';
import { DiscService } from './disc.service';
import { DiscController } from './disc.controller';

@Module({
  providers: [DiscService],
  controllers: [DiscController]
})
export class DiscModule {}
