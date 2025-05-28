import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { tasksEnum } from '../schemas/tasks.schema';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum({ enum: tasksEnum, default: 'To-Do' })
  status?: tasksEnum;

  @IsOptional()
  @IsDateString()
  dueDate?: Date;
}
