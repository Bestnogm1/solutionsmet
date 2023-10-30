import { Body, Controller, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { TaskService } from './task.service';


@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Post("create")
  async createTask(@Body() createTaskBody: any) {
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

  @Post(":id")
  getOneTask(@Param("id") getOneTaskID: any) {
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
}