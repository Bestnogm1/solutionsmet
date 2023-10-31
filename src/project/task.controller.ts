import { Body, Controller, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { DeleteTaskDto, TaskDto } from './dto/task.dto';


@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Post("create")
  async createTask(@Body() createTaskBody: TaskDto) {
    try {
      const createdUser = await this.taskService.createTask(createTaskBody);
      return createdUser
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Error Creating Task',
          message: error.message,
        },
        HttpStatus.FORBIDDEN,
      )
    }
  }

  @Post("get-one/:id")
  getOneTask(@Param("id") getOneTaskID: string) {
    try {
      return this.taskService.findOne(getOneTaskID);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Error the project',
          message: error.message,
        },
        HttpStatus.FORBIDDEN,
      )
    }
  }

  @Post("delete-task")
  deleteTask(@Body() deleteTaskBody: DeleteTaskDto) {
    try {
      return this.taskService.deleteTask(deleteTaskBody);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Error Deleting Task',
          message: error.message,
        },
        HttpStatus.FORBIDDEN,
      )
    }
  }
}
// {
//   taskId: '653fe21050492d9bae6e9d3c',
//     status: 'backlog',
//       projectId: '653e677c1df38bd7c5421ec9'
// }
