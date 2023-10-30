import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Task } from './task.schemas';
import { User } from '../../user/schemas/user.schemas';

export type ProjectDocument = HydratedDocument<Project>;

@Schema(
  {
    timestamps: true
  }
)
export class Project {

  @Prop({ required: true })
  title: string;

  @Prop({
    type: {
      backlog: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Task',
        },
      ],
      inProgress: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Task',
        },
      ],
      readyForReview: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Task',
        },
      ],
      completed: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Task',
        },
      ],
    },
    _id: false,
  })
  kanban: {
    backlog: Task[];
    inProgress: Task[];
    readyForReview: Task[];
    completed: Task[];
  }

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  members: User[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);