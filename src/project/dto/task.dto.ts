import { UserDto } from "src/user/dto/create-user.dto";


export class TaskDto {
  ticketTitle?: string;
  severity?: string;
  Owner?: UserDto;
  assignedTo?: string[];
  description?: string;
  status?: string;
  projectId?: string;
}

export class DeleteTaskDto extends TaskDto {
  taskId?: string;
  projectId?: string;
  status?: string;
}