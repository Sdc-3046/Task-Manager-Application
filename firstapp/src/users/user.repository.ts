/* eslint-disable prettier/prettier */
import { UserEntity } from "src/entity/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth.credentials.dto";
import crypto from 'crypto-js';
import { NotFoundException } from "@nestjs/common";


@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity>{


    async signup(authCredentialsDto: AuthCredentialsDto, userName: string) {
        const user = new UserEntity();
        user.userName = userName;
        user.userEmail = authCredentialsDto.userEmail;
        user.userPassword = `${crypto.MD5(authCredentialsDto.userPassword)}`;

        await user.save();
    }

    async signin(authCredentialsDto: AuthCredentialsDto) {

        const { userEmail, userPassword } = authCredentialsDto;
        const user = await this.findOne({ userEmail });

        if (user && await user.validatePassword(userPassword)) {
            return user;
        }
        throw new NotFoundException('No such user found');
    }

}