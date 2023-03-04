import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async addUser(name: string, location: string, age: number) {
    const user = new this.userModel({ name, location, age });
    const record = await user.save();
    return record;
  }

  async getAllUsers() {
    const users = await this.userModel.find();
    return users;
  }

  async getUserById(userId: string) {
    const user = await this.userModel.findById(userId);
    return user;
  }

  async updateUser(
    userId: string,
    name: string,
    location: string,
    age: number,
  ) {
    await this.userModel.findByIdAndUpdate(userId, {
      name,
      location,
      age,
    });
    const updatedUser = await this.userModel.findById(userId);
    return updatedUser;
  }

  async deleteUser(userId: string) {
    const deletedUser = this.userModel.findByIdAndDelete(userId);
    return deletedUser;
  }

}
