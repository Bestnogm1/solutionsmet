import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './schemas/project.schemas';
import mongoose from 'mongoose';
import { Task } from './schemas/task.schemas';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name)
    private projectModel: mongoose.Model<Project>,
    @InjectModel(Task.name)
    private taskModel: mongoose.Model<Task>
  ) { }

  async createProject(createProjectDto: any) {
    const createdProject = new this.projectModel(createProjectDto);
    return await createdProject.save();
  }
  async findOne(id: number) {
    const getOneProject = await this.projectModel.findById(id).populate('members')
      .populate({
        path: 'kanban.backlog kanban.inProgress kanban.readyForReview kanban.completed',
      }).lean();
    return getOneProject;
  }

  async ticketStatusChange(id: number, ticketStatusChangeDto: any) {
    await this.taskModel.findByIdAndUpdate(ticketStatusChangeDto.taskId, {
      status: ticketStatusChangeDto.status
    });
    const getOneProject = await this.projectModel.findByIdAndUpdate(
      id,
      {
        $pull: { [`kanban.${ticketStatusChangeDto.oldStatus}`]: ticketStatusChangeDto.taskId },
        $push: { [`kanban.${ticketStatusChangeDto.status}`]: ticketStatusChangeDto.taskId },
      },
      { new: true },
    );

    console.log(getOneProject);
    return await getOneProject.save();
  }

}
