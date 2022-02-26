/* eslint-disable prettier/prettier */

import { TypeOrmModuleOptions } from "@nestjs/typeorm"
import { TaskEntity } from "src/entity/tasks.entity";
import { UserEntity } from "src/entity/user.entity";

export const TypeORMConfiguration: TypeOrmModuleOptions = {
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "sdc1234",
    "database": "company",
    "synchronize": false,
    "entities": [UserEntity, TaskEntity],
};