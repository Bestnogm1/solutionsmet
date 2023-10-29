import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Task } from '../../project/schemas/task.schemas';

export type UserDocument = HydratedDocument<User>;

@Schema(
  {
    timestamps: true
  }
)
export class User {

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }] })
  taskAssignedToMe: Task[];
}

export const UserSchema = SchemaFactory.createForClass(User);