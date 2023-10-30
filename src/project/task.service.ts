import { Injectable } from "@nestjs/common";
import { Project } from "./schemas/project.schemas";
import mongoose from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Task } from "./schemas/task.schemas";

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Project.name)
    private projectModel: mongoose.Model<Project>,
    @InjectModel(Task.name)
    private taskModel: mongoose.Model<Task>
  ) { }

  async createTask(createTaskDto: any) {
    const createdTask = new this.taskModel(createTaskDto);
    await this.projectModel.findByIdAndUpdate(createTaskDto.projectId, {
      $push: {
        [`kanban.${createTaskDto.status}`]: createdTask._id
      }
    })
    return await createdTask.save();
  }
  async findOne(id: number) {
    const getOneTask = await this.taskModel.findById(id);
    return getOneTask;
  }
}