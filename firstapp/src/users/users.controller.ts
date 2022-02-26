/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, Param, Patch, Delete, ValidationPipe, UsePipes, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserEntity } from "src/entity/user.entity";
import { AuthCredentialsDto } from "./dto/auth.credentials.dto";
import { GetUser } from "./get.user.decorator";
import { UserServices } from "./users.service";


@Controller('users')
export class UserController {

    constructor(private readonly userService: UserServices) {

    }

    @Get('profile')
    @UseGuards(AuthGuard())
    getProfile(@GetUser() user: UserEntity) {
        return user;
    }

    @Post('signup')
    @UsePipes(ValidationPipe)
    signUp(@Body() authCredentialsDto: AuthCredentialsDto, @Body('userName') userName: string) {
        console.log(authCredentialsDto.userEmail)
        return this.userService.signup(authCredentialsDto, userName);
    }

    @Post('signin')
    @UsePipes(ValidationPipe)
    signIn(@Body() authCredentialsDto: AuthCredentialsDto) {
        console.log(authCredentialsDto.userEmail)
        return this.userService.signin(authCredentialsDto);
    }
}