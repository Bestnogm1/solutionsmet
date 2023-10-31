import { Injectable } from "@nestjs/common";
import { Project } from "./schemas/project.schemas";
import mongoose, { Mongoose } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Task } from "./schemas/task.schemas";
import { DeleteTaskDto, TaskDto } from "./dto/task.dto";

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Project.name)
    private projectModel: mongoose.Model<Project>,
    @InjectModel(Task.name)
    private taskModel: mongoose.Model<Task>
  ) { }

  async createTask(createTaskDto: TaskDto) {
    const createdTask = new this.taskModel(createTaskDto);
    await this.projectModel.findByIdAndUpdate(createTaskDto.projectId, {
      $push: {
        [`kanban.${createTaskDto.status}`]: createdTask._id
      }
    })
    return await createdTask.save();
  }
  async findOne(id: string) {
    const getOneTask = await this.taskModel.findById(id);
    return getOneTask;
  }

  async deleteTask(deletedTaskDto: DeleteTaskDto) {
    await this.projectModel.findByIdAndUpdate(deletedTaskDto.projectId, {
      $pull: {
        [`kanban.${deletedTaskDto.status}`]: deletedTaskDto.taskId
      }
    })

    const deletedTask = await this.taskModel.findByIdAndDelete(deletedTaskDto.taskId);
    return deletedTask;
  }
}