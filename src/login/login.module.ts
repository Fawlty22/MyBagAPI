import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import {UserService} from "../user/user.service";
import {UserModule} from "../user/user.module";

@Module({
  imports: [HttpModule, UserModule],
  controllers: [LoginController],
  providers: [LoginService, UserService],
  exports: [LoginService],
})
export class LoginModule {}
