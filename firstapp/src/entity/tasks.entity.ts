/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { TaskStatus } from 'src/tasks/task.enum';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm';
import { UserEntity } from './user.entity';
import { IsNotEmpty } from 'class-validator';

@Entity('Task')
export class TaskEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    taskName: string;

    @IsNotEmpty()
    @Column()
    taskDescription: string;

    @Column()
    taskStatus: TaskStatus;

    @ManyToOne(type => UserEntity, user => user.tasks, { eager: false })
    user: UserEntity;

    @Column()
    userId: number;
}
