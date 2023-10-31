import { Body, Controller, HttpException, HttpStatus, Post, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schemas';
import { UserDto } from './dto/create-user.dto';


@Controller('user')
export class UserController {
  constructor(private readonly userServices: UserService) { }
  // give me the crud for this user
  @Post("create")
  async createUser(@Body() body: UserDto) {
    try {
      const createdUser = await this.userServices.create(body)
      if (createdUser) {
        return createdUser
      }
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
  @Get("all")
  async getAllUser() {
    try {
      const allUsers = await this.userServices.findAll()
      if (allUsers) {
        return allUsers
      }
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

  @Post("update")
  async updateUser() {
    return "update user"
  }

  @Post(":id")
  async getOneUser() {
    return "update user"
  }

}
