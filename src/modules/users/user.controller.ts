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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CreateUserDto } from './Dto/createUser.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return users;
  }
  @Get(':id')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findOne(@Param('id') userId: string) {
    const userbyId = await this.userService.findOne(userId);
    return userbyId;
  }
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    // console.log('user=>', CreateUserDto);
    const newUser = await this.userService.createUser(createUserDto);

    return newUser;
  }
  @Patch(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body() updateUserDto: CreateUserDto,
  ) {
    {
      const updateUser = await this.userService.updateUser(
        userId,
        updateUserDto,
      );
      return updateUser;
    }
  }
  @Delete(':id')
  async deleteUser(@Param('id') userId: string) {
    const deleteUser = await this.userService.deleteUser(userId);
    return deleteUser;
  }
}
