import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import CreateUserDto from './dtos/createUser.dto';
import UpdatePasswordDto from './dtos/updatePassword.dto';
import UserEntity from './entities/user.entity';
import UUIDPipe from '../../pipes/uuid-validation.pipe';

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get()
  getAll(): UserEntity[] {
    return this._userService.getAll();
  }

  @Get(':id')
  getUserById(@Param('id', UUIDPipe) id: string): UserEntity {
    return this._userService.getUserById(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): UserEntity {
    return this._userService.createUser(createUserDto);
  }

  @Put(':id')
  updatePassword(
    @Param('id', UUIDPipe) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): UserEntity {
    return this._userService.updateUserPassword(id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param('id', UUIDPipe) id: string): void {
    this._userService.deleteUser(id);
  }
}
