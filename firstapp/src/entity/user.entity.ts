/* eslint-disable prettier/prettier */
import { enc } from 'crypto-js';
import { type } from 'os';
//import { Task } from 'src/tasks/task.model';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, Unique } from 'typeorm';
import { TaskEntity } from './tasks.entity';
import * as crypto from 'crypto-js';

@Entity('user')
@Unique(['userName', 'userEmail'])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  userEmail: string;

  @Column()
  userPassword: string;

  @OneToMany(type => TaskEntity, task => task.user, { eager: true, onDelete: 'SET NULL' })
  tasks: TaskEntity[];

  async validatePassword(password: string) {
    const encrypted = `${crypto.MD5(password)}`;
    return encrypted == this.userPassword;
  }
}

