/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/entity/user.entity";
import { TaskStatus } from "./task.enum";
import { TaskRepository } from "./task.repository";

@Injectable()
export class TaskServices {
    /*tasks:Task[]=[];*/

    constructor(@InjectRepository(TaskRepository) private taskRepository: TaskRepository,) {

    }

    async getTaskById(id: number, user: UserEntity) {
        const task = this.taskRepository.findOne(id);
        if (!task) {
            throw new NotFoundException('task not found');
        }
        if ((await task).userId === user.id) {
            return task;
        }
        throw new UnauthorizedException('Unauthorized access');
    }

    async addTask(taskName: string, taskDescription: string, user: UserEntity) {
        return this.taskRepository.createTask(taskName, taskDescription, user);
    }

    async getTasks(taskStatus: TaskStatus, user: UserEntity) {
        return this.taskRepository.getTasks(taskStatus, user);
    }

    async updateStatus(id: number, taskStatus: TaskStatus, user: UserEntity) {
        const task = await this.getTaskById(id, user);

        task.taskStatus = taskStatus;
        await task.save();
        return task;
    }

    async delteTask(id: number, user: UserEntity) {
        const result = this.taskRepository.delete(id);
        if ((await result).affected === 0) {
            throw new NotFoundException('No task found');
        }
        return result;
    }
}