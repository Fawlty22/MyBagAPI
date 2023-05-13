import { Test, TestingModule } from '@nestjs/testing';
import { DiscController } from './disc.controller';

describe('DiscController', () => {
  let controller: DiscController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiscController],
    }).compile();

    controller = module.get<DiscController>(DiscController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
