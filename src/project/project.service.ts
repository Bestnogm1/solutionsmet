import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './schemas/project.schemas';
import mongoose from 'mongoose';
import { Task } from './schemas/task.schemas';
import { CreateProjectDto, UpdateProjectTaskDto } from './dto/create-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name)
    private projectModel: mongoose.Model<Project>,
    @InjectModel(Task.name)
    private taskModel: mongoose.Model<Task>
  ) { }

  async createProject(createProjectDto: CreateProjectDto) {
    const createdProject = new this.projectModel(createProjectDto);
    return await createdProject.save();
  }

  async findOne(id: string) {
    const getOneProject = await this.projectModel.findById(id).populate('members')
      .populate({
        path: 'kanban.backlog kanban.inProgress kanban.readyForReview kanban.completed',
      }).lean();
    return getOneProject;
  }

  async ticketStatusChange(id: string, ticketStatusChangeDto: UpdateProjectTaskDto) {
    await this.taskModel.findByIdAndUpdate(ticketStatusChangeDto.taskId, {
      status: ticketStatusChangeDto.newStatus
    }, { new: true });

    const getOneProject = await this.projectModel.findOneAndUpdate(
      { _id: id },
      {
        $pull: { [`kanban.${ticketStatusChangeDto.oldStatus}`]: ticketStatusChangeDto.taskId },
        $push: { [`kanban.${ticketStatusChangeDto.newStatus}`]: ticketStatusChangeDto.taskId },
      },
      { new: true },
    );

    return getOneProject;
  }

}
