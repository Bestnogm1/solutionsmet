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

  @Prop({ required: true })
  author: string[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' }] })
  owner: [];

  @Prop({
    type: {
      backlog: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task', default: [] },],
      inProgress: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task', default: [] }],
      readyForReview: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task', default: [] }],
      completed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task', default: [] }]
    }
  })

  kanban: {
    backlog: Task[],
    inProgress: Task[],
    readyForReview: Task[]
    completed: Task[]
  }

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  members: User[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);