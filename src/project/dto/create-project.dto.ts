import { UserDto } from "src/user/dto/create-user.dto";

export class CreateProjectDto {
  title: string;
  members: UserDto[];
}

export class UpdateProjectTaskDto {
  taskId: string;
  newStatus: string;
  oldStatus: string;
}