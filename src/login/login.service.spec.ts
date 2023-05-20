import { Test, TestingModule } from '@nestjs/testing';
import { LoginService } from './login.service';
import {ConfigService} from "@nestjs/config";
import {HttpModule} from "@nestjs/axios";

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoginService, ConfigService],
      imports:[HttpModule]
    }).compile();

    service = module.get<LoginService>(LoginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
