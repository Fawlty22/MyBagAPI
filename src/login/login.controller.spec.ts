import { Test, TestingModule } from '@nestjs/testing';
import { LoginController } from './login.controller';
import {LoginService} from "./login.service";
import {HttpModule} from "@nestjs/axios";
import {ConfigService} from "@nestjs/config";

describe('LoginController', () => {
  let controller: LoginController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers:[LoginService, ConfigService],
      imports:[HttpModule]

    }).compile();

    controller = module.get<LoginController>(LoginController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
