import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { UserModule } from '../user/user.module';
import {UserService} from "../User/user.service";
import {UserRepository} from "../User/repositories/user.repository";

@Module({
  imports: [HttpModule, UserModule], // Import UserModule here
  controllers: [LoginController],
  providers: [LoginService, UserService, UserRepository],
  exports: [LoginService],
})
export class LoginModule {}
