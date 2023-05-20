import {HttpException, Injectable} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {ConfigService} from "@nestjs/config";
import {
  CognitoIdentityProvider, GlobalSignOutRequest,
  InitiateAuthCommandInput,
  InitiateAuthCommandOutput
} from '@aws-sdk/client-cognito-identity-provider'
import {createHmac} from 'crypto';
import {CognitoIdentityServiceProvider} from "aws-sdk";
import {LoginDto} from "./dto/login.dto";
import {ForgotPasswordDto} from "./dto/forgot-password.dto";
import {ResetPasswordDto} from "./dto/reset-password.dto";
import {UserService} from "../User/user.service";
import {Exception} from "handlebars";

@Injectable()
export class LoginService {
  clientId: string = this.configService.get('cognitoClientId');
  clientSecret: string = this.configService.get('cognitoClientSecret');

  constructor(private readonly httpService: HttpService, private configService: ConfigService, private userService: UserService) {
  }

  async login(credentials: any): Promise<InitiateAuthCommandOutput>{
    const email: string = credentials.username;
    //Check that user is not inactive before attempting to call cognito
    const user = await this.userService.getUserByEmail(email);

    if(user && !user.active){
      throw new Exception("User has been deactivated.");
    }

    const params: InitiateAuthCommandInput = {
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: this.clientId,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: credentials.password,
        SECRET_HASH: this.hashSecret(this.clientSecret, email, this.clientId),
      }
    };
    const provider = new CognitoIdentityProvider({region: this.configService.get('region')})

    return await provider.initiateAuth(params);
  }

  hashSecret(clientSecret, username, clientId) {
    return createHmac('SHA256', clientSecret)
        .update(username + clientId)
        .digest('base64')
  }

  async newPasswordReq(loginDto: LoginDto, session: string) {
    const email: string = loginDto.username
    const params = {
      ChallengeName: 'NEW_PASSWORD_REQUIRED',
      ChallengeResponses: {
        NEW_PASSWORD: loginDto.password,
        USERNAME: email,
        SECRET_HASH: this.hashSecret(this.clientSecret, email, this.clientId),
      },
      ClientId: this.clientId,
      Session: session
    }
    const provider = new CognitoIdentityServiceProvider({region: this.configService.get('region')});
    return await provider.respondToAuthChallenge(params).promise();
  }

  async logout(cookie: string) {
    const params: GlobalSignOutRequest = {
      AccessToken: cookie
    };
    const provider = new CognitoIdentityServiceProvider({region: this.configService.get('region')});
    return await provider.globalSignOut(params).promise();
  }

  async forgotPassword(request: ForgotPasswordDto){
    const email: string = request.username
    const params = {
      SecretHash: this.hashSecret(this.clientSecret, email, this.clientId),
      Username: email,
      ClientId:this.clientId,
    }
    const provider = new CognitoIdentityServiceProvider({region: this.configService.get('region')});

    await provider.forgotPassword(params).promise();
    return
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const email: string = resetPasswordDto.username;
    const params = {
      SecretHash: this.hashSecret(this.clientSecret, email, this.clientId),
      ConfirmationCode: resetPasswordDto.confirmationCode,
      Username: email,
      Password: resetPasswordDto.password,
      ClientId: this.clientId,
    }

    const provider = new CognitoIdentityServiceProvider({region: this.configService.get('region')});
    return await provider.confirmForgotPassword(params).promise();
  }
}
