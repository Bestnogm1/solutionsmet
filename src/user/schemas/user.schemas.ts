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

  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ type: String, default: '' })
  bio: string;

  @Prop({ type: String, default: '' })
  profileImage: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }], default: [] })
  taskAssignedToMe: Task[];
}

export const UserSchema = SchemaFactory.createForClass(User);