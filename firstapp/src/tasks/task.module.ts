/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "src/users/users.module";
import { TaskRepository } from "./task.repository";
import { TasksController } from "./tasks.controller";
import { TaskServices } from "./tasks.service";

@Module({
    imports: [TypeOrmModule.forFeature([TaskRepository]), UserModule],
    controllers: [TasksController,],
    providers: [TaskServices],

})

export class TaskModule { }