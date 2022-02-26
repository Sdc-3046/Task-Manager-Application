/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthCredentialsDto } from "./dto/auth.credentials.dto";
import { JwtPayload } from "./jwt.payload";
import { UserRepository } from "./user.repository";


@Injectable()
export class UserServices {


    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository, private jwtService: JwtService) { }


    async signup(authCredentialsDto: AuthCredentialsDto, userName: string) {
        return this.userRepository.signup(authCredentialsDto, userName);
    }

    async signin(authCredentialsDto: AuthCredentialsDto) {
        const user = this.userRepository.signin(authCredentialsDto);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const payload: JwtPayload = {
            userEmail: authCredentialsDto.userEmail,
            id: (await user).id,
        };
        console.log("Signed in")
        const token = this.jwtService.sign(payload)
        return { token };
    }
}