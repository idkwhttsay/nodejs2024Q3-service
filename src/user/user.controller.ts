import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import CreateUserDto from './dtos/createUser.dto';
import UpdatePasswordDto from './dtos/updatePassword.dto';
import UserEntity from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get()
  getAll(): UserEntity[] {
    return this._userService.getAll();
  }

  @Get(':id')
  getUserById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): UserEntity {
    return this._userService.getUserById(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): UserEntity {
    return this._userService.createUser(createUserDto);
  }

  @Put(':id')
  updatePassword(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): UserEntity {
    return this._userService.updateUserPassword(id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): void {
    this._userService.deleteUser(id);
  }
}
