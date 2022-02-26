/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './tasks/task.module';
import { UserModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeORMConfiguration } from './config/typeorm.config';

@Module({
  imports: [TaskModule, UserModule, TypeOrmModule.forRoot(TypeORMConfiguration)],
  controllers: [AppController,],
  providers: [AppService,],
})
export class AppModule { }