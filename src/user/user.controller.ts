import { Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userServices: UserService) { }
  // give me the crud for this user
  @Post("create")
  async createUser() {
    try {

    } catch (error) {
      return "create user"
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
