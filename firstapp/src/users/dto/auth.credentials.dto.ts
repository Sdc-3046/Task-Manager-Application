/* eslint-disable prettier/prettier */
import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {

    userEmail: string;


    userPassword: string;

}