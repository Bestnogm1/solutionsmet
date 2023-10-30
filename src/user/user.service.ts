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

  async create(createUserDto: User): Promise<User> {
    const createdUser = new this.userModel(createUserDto)
    return await createdUser.save()
  }
  async findAll(): Promise<User[]> {
    return this.userModel.find({})
  }
}
