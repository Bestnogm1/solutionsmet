import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectSchema } from './schemas/project.schemas';
import { TaskSchema } from './schemas/task.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Project", schema: ProjectSchema }, { name: "task", schema: TaskSchema }]),
  ],
  controllers: [ProjectController],
  providers: [ProjectService]
})
export class ProjectModule { }
