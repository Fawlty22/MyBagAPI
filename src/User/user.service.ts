import {HttpException, Injectable} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import {UserRepository} from "./repositories/user.repository";
import {User} from "./entities/user.entity";
import jwt_decode from "jwt-decode";
import {CognitoIdentityProvider, InitiateAuthCommandInput} from "@aws-sdk/client-cognito-identity-provider";
import {ConfigService} from "@nestjs/config";
import AWS, {CognitoIdentityServiceProvider} from "aws-sdk";

@Injectable()
export class UserService {
    clientId: string = this.configService.get('cognitoClientId');
    clientSecret: string = this.configService.get('cognitoClientSecret');
    constructor(private userRepository: UserRepository,  private configService: ConfigService) {}

    async create(createUserDto: CreateUserDto) {
        const params = {
            DesiredDeliveryMediums: ['EMAIL'],
            Username: createUserDto.email,
            UserPoolId: this.configService.get('cognitoUserPoolId'),
            UserAttributes: [
                {
                    Name: "email",
                    Value: createUserDto.email
                },
                {
                    Name: "email_verified",
                    Value: "true"
                }
            ],
        };
        const provider = new CognitoIdentityServiceProvider({region: this.configService.get('region')});
        const cognitoUser =  await provider.adminCreateUser(params).promise();

        //We need to verify the user email address after creation


        // Create the user with inputs and cognito in our db
        createUserDto.cognitoId = cognitoUser.User.Username;
        const user = await this.userRepository.create(createUserDto);
        return await this.userRepository.save(user)
    }

    async findAll(roles: boolean): Promise<User[]> {
        if (roles){
            return await this.userRepository.find(
                {
                    where:{ active: 1 }
                })
        } else {
            return await this.userRepository.find();
        }
    }

    async findOne(id: number): Promise<User> {
        return await this.userRepository.findOne({ where: { id }});
    }

    async update(id: number, user: Partial<User>, accessToken: string): Promise<User> {
        const currentUserValues = await this.userRepository.findOne({ where: { id }});
        if(user.email && currentUserValues.email !== user.email){
            // If the users email is being updated - we need to also update email in Cognito
            const params = {
                UserAttributes: [
                    {
                        Name: "email",
                        Value: user.email
                    },
                    {
                        Name: "email_verified",
                        Value: "true"
                    }
                ],
                Username: currentUserValues.email,
                UserPoolId: this.configService.get('cognitoUserPoolId')
            };
            const provider = new CognitoIdentityServiceProvider({region: this.configService.get('region')})

            await provider.adminUpdateUserAttributes(params).promise()
        }

        //Since this is a patch, we aren't required to pass in the full object, so merge with existing
        const mergedUser = {...currentUserValues, ...user};

        await this.userRepository.save(mergedUser)
        return await this.userRepository.findOne({ where: { id }})
    }

    async softDelete(id: number): Promise<void> {
        await this.userRepository.softDelete(id);
    }

    async getCurrentUser(accessToken: string) {
        //from accessToken, get the 'username', go to user table, match on cognitoId
        const decodedToken: any = jwt_decode(accessToken)
        return await this.userRepository.findOne({where: {cognitoId: decodedToken.username}})
    }

    async getUserByEmail(email: string){
        return await this.userRepository.findOne({where: {email: email}})
    }
}
