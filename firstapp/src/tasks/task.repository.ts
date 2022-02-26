/* eslint-disable prettier/prettier */
import { TaskEntity } from "src/entity/tasks.entity";
import { UserEntity } from "src/entity/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { TaskStatus } from "./task.enum";

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity>{

    async createTask(taskName: string, taskDescription: string, user: UserEntity) {
        const task = new TaskEntity();
        task.taskName = taskName;
        task.taskDescription = taskDescription;
        task.taskStatus = TaskStatus.OPEN;
        console.log(task.taskName);
        task.userId = user.id;
        task.user = user;
        await task.save();
        return task;
    }

    async getTasks(taskStatus: TaskStatus, user: UserEntity) {

        const query = this.createQueryBuilder('task');
        query.andWhere('task.taskStatus=:taskStatus', { taskStatus: taskStatus });
        query.andWhere('task.userId=:userId', { userId: user.id })
        return query.getMany();
    }


}

/*

"taskName":"Task Manager App",
    "taskDescription":"Complete App",
    "taskStatus":"Done",
    "taskAuthor":"Shubham"

    "taskName":"Painting",
    "taskDescription":"Complete the drawing",
    "taskStatus":"IN_PROGRESS",
    "taskAuthor":"Guru"

*/