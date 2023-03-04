import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body('name') userName: string,
    @Body('location') userLocation: string,
    @Body('age') userAge: number,
  ) {
    const user = await this.userService.addUser(
      userName,
      userLocation,
      userAge,
    );
    return user;
  }

  @Get()
  async getAllUsers() {
    const users = await this.userService.getAllUsers();
    return { users };
  }

  @Get(':id')
  async getUserById(@Param('id') userId: string) {
    const user = await this.userService.getUserById(userId);
    return { user };
  }

  @Patch(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body('name') userName: string,
    @Body('location') userLocation: string,
    @Body('age') userAge: number,
  ) {
    const updatedUser = await this.userService.updateUser(
      userId,
      userName,
      userLocation,
      userAge,
    );
    return { updatedUser };
  }

  @Delete(':id')
  async deleteUserByID(@Param('id') userId: string) {
    const deletedUser = await this.userService.deleteUser(userId);
    return { deletedUser };
  }
}
