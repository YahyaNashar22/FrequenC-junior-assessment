import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum tasksEnum {
  PENDING = 'To-Do',
  IN_PROGRESS = 'In Progress',
  DONE = 'Done',
}

@Schema({ timestamps: true })
export class Task extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ enum: tasksEnum, default: tasksEnum.PENDING })
  status: tasksEnum;

  @Prop()
  dueDate: Date;
}

export const taskSchema = SchemaFactory.createForClass(Task);
