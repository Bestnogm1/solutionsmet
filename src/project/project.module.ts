import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectSchema } from './schemas/project.schemas';
import { TaskSchema } from './schemas/task.schemas';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Project", schema: ProjectSchema }, { name: "Task", schema: TaskSchema }]),
  ],
  controllers: [ProjectController, TaskController],
  providers: [ProjectService, TaskService]
})
export class ProjectModule { }
