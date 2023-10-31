import { Body, Controller, HttpException, HttpStatus, Param, Post, Get } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto, UpdateProjectTaskDto } from './dto/create-project.dto';


@Controller('project')
export class ProjectController {
  constructor(private readonly userServices: ProjectService) { }

  @Post("create")
  async createProject(@Body() createProjectBody: CreateProjectDto) {
    try {
      return await this.userServices.createProject(createProjectBody);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Error getting All the user',
          message: error.message,
        },
        HttpStatus.FORBIDDEN,
      )
    }
  }

  @Get(":id")
  getOneProject(@Param("id") getOneProjectID: string) {
    try {
      return this.userServices.findOne(getOneProjectID);
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
  @Post(":id/ticketStatusChange")
  ticketStatusChange(@Body() ticketStatusChangeDto: UpdateProjectTaskDto, @Param("id") id: string) {
    try {
      return this.userServices.ticketStatusChange(id, ticketStatusChangeDto);
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
