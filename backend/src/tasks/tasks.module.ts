import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, taskSchema } from './schemas/tasks.schema';
import { TasksController } from './tasks.controller';
import { TaskService } from './tasks.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Task.name,
        schema: taskSchema,
      },
    ]),
  ],
  controllers: [TasksController],
  providers: [TaskService],
})
export class TaskModule {}
