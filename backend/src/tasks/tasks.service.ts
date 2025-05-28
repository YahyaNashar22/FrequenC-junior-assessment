import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schemas/tasks.schema';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskModel.create(createTaskDto);
  }

  async findAll(
    page = 1,
    limit = 10,
    search?: string,
  ): Promise<{ tasks: Task[]; total: number; page: number; limit: number }> {
    const filter = search ? { title: { $regex: search, $options: 'i' } } : {};

    const skip = (page - 1) * limit;

    const [tasks, total] = await Promise.all([
      this.taskModel.find(filter).skip(skip).limit(limit).exec(),
      this.taskModel.countDocuments(filter),
    ]);
    return {
      tasks,
      total,
      page,
      limit,
    };
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskModel.findByIdAndUpdate(id, updateTaskDto, {
      new: true,
    });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async remove(id: string): Promise<void> {
    const result = await this.taskModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Task not found');
  }
}
