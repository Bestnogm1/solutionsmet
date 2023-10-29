import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schemas';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>
  ) { }
  async create(createUserDto: User): Promise<User | Error> {
    try {
      const createdUser = new this.userModel(createUserDto)
      if (createdUser) {
        return await createdUser.save()
      }
    } catch (error) {
      throw error;
    }
  }
}
