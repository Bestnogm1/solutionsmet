import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../user/schemas/user.schemas';


export type TaskDocument = HydratedDocument<Task>;
type enumTask = 'Low' | 'Medium' | 'High';

@Schema(
  {
    timestamps: true
  }
)
export class Task {
  @Prop({ required: true })
  ticketTitle: string;

  @Prop({ required: true })
  severity: string;

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner' } })
  Owner: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
  assignedTo: User[];

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, default: "backlog" })
  status: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);