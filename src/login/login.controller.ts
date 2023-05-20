import {Body, Controller, HttpCode, HttpException, Post, Req, Res} from '@nestjs/common';
import {LoginService} from './login.service';
import {CookieOptions, Request, Response} from 'express';
import {LoginDto} from "./dto/login.dto";
import {Login} from "./interfaces/login.interface";
import jwt_decode, {JwtPayload} from "jwt-decode";
import {InitiateAuthCommandOutput, RespondToAuthChallengeResponse} from "@aws-sdk/client-cognito-identity-provider";
import {ForgotPasswordDto} from "./dto/forgot-password.dto";
import {ResetPasswordDto} from "./dto/reset-password.dto";



@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('logout')
  async logout(
      @Res({ passthrough: true }) response: Response,
      @Req() request: Request,
  ): Promise<Login> {
    try{
     await this.loginService.logout(request.cookies.token);
      response.clearCookie('token');
      return
    } catch (e){
      throw new HttpException(e.message,401);
    }
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ): Promise<Login> {
    try{
      const userInfo: InitiateAuthCommandOutput = await this.loginService.login(loginDto);
      const cookiesOpts: CookieOptions = {
        httpOnly: true,
      };
      if(userInfo.ChallengeName === 'NEW_PASSWORD_REQUIRED'){
        response.cookie('token', userInfo.Session, cookiesOpts);
        return {username:loginDto.username, challenge:userInfo.ChallengeName}

      } else {
        response.cookie('token', userInfo?.AuthenticationResult?.AccessToken, cookiesOpts);
      }

      return
    } catch (e){
      response.clearCookie('token');
      throw new HttpException(e.message,401);
    }

  }

  @Post('login/new')
  async newPassword(
      @Body() loginDto: LoginDto,
      @Res({ passthrough: true }) response: Response,
      @Req() request: Request,
  ): Promise<Login> {
    try{
      const cookiesOpts: CookieOptions = {
        httpOnly: true,
      };
      const userInfo: RespondToAuthChallengeResponse = await this.loginService.newPasswordReq(loginDto, request.cookies.token);
      response.cookie('token', userInfo?.AuthenticationResult?.AccessToken, cookiesOpts);
      return
    } catch (e){
      throw new HttpException(e.message,401);
    }

  }

  @Post('login/forgot')
  @HttpCode(204)
  async forgotPassword(
      @Body() request: ForgotPasswordDto,
  ) {
    try{
      return await this.loginService.forgotPassword(request);
    } catch (e){
      throw new HttpException(e.message,401);
    }
  }

  @Post('login/reset')
  @HttpCode(204)
  async resetPassword(
      @Body() request: ResetPasswordDto,
  ) {
    try{
      return await this.loginService.resetPassword(request);
    } catch (e){
      throw new HttpException(e.message,401);
    }
  }
}
