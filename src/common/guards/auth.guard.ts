//
// import {Injectable, CanActivate, ExecutionContext, HttpException} from '@nestjs/common';
// import { Observable } from 'rxjs';
// import {Reflector} from "@nestjs/core";
// import {ConfigService} from "@nestjs/config";
// import { DataSource } from "typeorm";
// import { User } from "../../users/entities/user.entity";
// import jwt_decode from "jwt-decode";
// const CognitoExpress = require("cognito-express");
//
// @Injectable()
// export class AuthGuard implements CanActivate {
//     constructor(private reflector: Reflector, private configService: ConfigService, private dataSource:DataSource) {
//     }
//     canActivate(
//         context: ExecutionContext,
//     ): boolean | Promise<boolean> | Observable<boolean> {
//         const request = context.switchToHttp().getRequest();
//         const allowUnauthorizedRequest = this.reflector.get<boolean>('allowUnauthorizedRequest', context.getHandler());
//
//         return allowUnauthorizedRequest || this.validateRequest(request);
//
//     }
//
//     async validateRequest(request){
//
//         const cognitoExpress = new CognitoExpress({
//             region: this.configService.get('region'),
//             cognitoUserPoolId: this.configService.get('cognitoUserPoolId'),
//             tokenUse: "access"
//         });
//         //Check access tokens validity
//         try{
//             await cognitoExpress.validate(request.cookies.token);
//             const decodedToken: any = jwt_decode(request.cookies.token);
//             const currentUser = await this.dataSource.getRepository(User).findOne({where: {cognitoId: decodedToken.username}});
//             if(!currentUser.active){
//                 throw new HttpException('User has been deactivated.',401);
//             }
//
//             return true
//         } catch (e){
//             throw new HttpException(e.message,401);
//         }
//     }
// }
