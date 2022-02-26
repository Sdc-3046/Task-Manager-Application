/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, Param, Patch, Delete, UsePipes, ValidationPipe, UseGuards, Query } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserEntity } from "src/entity/user.entity";
import { GetUser } from "src/users/get.user.decorator";
import { TaskStatus } from "./task.enum";
import { TaskServices } from "./tasks.service";


@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {

    constructor(private readonly taskService: TaskServices) {

    }

    @Get(':taskStatus')
    getTasks(@GetUser() user: UserEntity, @Param('taskStatus') taskStatus: TaskStatus,) {
        console.log(taskStatus)
        return this.taskService.getTasks(taskStatus, user);
    }

    @Post('add')
    @UsePipes(ValidationPipe)
    addTask(@GetUser() user: UserEntity, @Body('taskName') taskName: string, @Body('taskDescription') taskDescription: string) {
        return this.taskService.addTask(taskName, taskDescription, user);
    }

    @Get(':id')
    getTaskById(@GetUser() user: UserEntity, @Param('id') id: number) {
        return this.taskService.getTaskById(id, user);
    }

    @Patch('update')
    updateStatus(@GetUser() user: UserEntity, @Body('id') id: number, @Body('taskStatus') taskStatus: TaskStatus) {
        return this.taskService.updateStatus(id, taskStatus, user);
    }

    @Delete('delete')
    deleteTask(@GetUser() user: UserEntity, @Body('id') id: number) {
        console.log("requested to delete")
        return this.taskService.delteTask(id, user);
    }


}