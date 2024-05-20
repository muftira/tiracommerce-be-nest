import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/users.schema';
import { UserRole } from './schema/userRole.schema';
import { CreateUserDto } from './Dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('UserRole') private userRoleModel: Model<UserRole>,
  ) {}

  async findAll() {
    const users = await this.userModel.aggregate([
      {
        $lookup: {
          from: 'userRoles',
          localField: 'role',
          foreignField: '_id',
          as: 'role',
        },
      },
      {
        $unwind: '$role',
      },
    ]);
    return {
      success: true,
      data: users,
    };
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('user is not found');
    }
    return {
      success: true,
      data: user,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async createUser({ role, email, ...createUserDto }: CreateUserDto) {
    if (role) {
      const user = await this.userModel.findOne({ email: email.toLowerCase() });
      if (user) {
        throw new NotFoundException('user is already existed');
      }
      const newRole = await this.userRoleModel.create(role);
      const newUser = await this.userModel.create({
        ...createUserDto,
        email: email.toLowerCase(),
        role: newRole._id,
      });

      return {
        success: true,
        message: 'user is created',
        data: newUser,
      };
    }
  }

  async updateUser(id: string, updateUserDto: CreateUserDto) {
    try {
      if (updateUserDto.role) {
        throw new NotFoundException('role cannot be updated');
      }
      const updateUser = await this.userModel.findByIdAndUpdate(
        id,
        updateUserDto,
        { new: true },
      );
      return {
        success: true,
        message: 'user is updated',
        data: updateUser,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  async deleteUser(id: string) {
    const deleteUser = await this.userModel.findByIdAndDelete(id, {
      new: true,
    });
    if (!deleteUser) {
      throw new NotFoundException('user is not found');
    }
    return {
      success: true,
      message: 'user is deleted',
      data: deleteUser,
    };
  }
}
