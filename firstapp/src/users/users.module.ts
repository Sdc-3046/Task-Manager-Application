/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/entity/user.entity";
import { JwtStrategy } from "./jwt.strategy";
import { UserRepository } from "./user.repository";
import { UserController } from "./users.controller";
import { UserServices } from "./users.service";

@Module({
    imports: [JwtModule.register({
        secret: 'secret',
        signOptions: {
            expiresIn: 3600,
        }
    }),
    PassportModule.register({
        defaultStrategy: 'jwt',
    }),
    TypeOrmModule.forFeature([UserRepository, UserEntity])],
    controllers: [UserController],
    providers: [UserServices, JwtStrategy],
    exports: [JwtStrategy, PassportModule],

})

export class UserModule { }