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
import UUIDPipe from '../../infrastructure/pipes/uuid-validation.pipe';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('user')
@ApiTags('Users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @ApiOperation({ summary: 'Get all Users' })
  @ApiResponse({
    status: 200,
    type: [UserEntity],
  })
  @Get()
  getAll(): UserEntity[] {
    return this._userService.getAll();
  }

  @ApiOperation({ summary: 'Get single user by ID' })
  @ApiResponse({
    status: 200,
    type: UserEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'userId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: "record with id === userId doesn't exist",
  })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'Id of user',
  })
  @Get(':id')
  getUserById(@Param('id', UUIDPipe) id: string): UserEntity {
    return this._userService.getUserById(id);
  }

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been created.',
    type: UserEntity,
  })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 400,
    description: 'Does not contain required fields',
  })
  @Post()
  createUser(@Body() createUserDto: CreateUserDto): UserEntity {
    return this._userService.createUser(createUserDto);
  }

  @ApiOperation({ summary: 'Update single user' })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'The ID of the user',
  })
  @ApiBody({ type: UpdatePasswordDto })
  @ApiResponse({ status: 200, type: UserEntity })
  @ApiResponse({ status: 400, description: 'ID has invalid format' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Put(':id')
  updatePassword(
    @Param('id', UUIDPipe) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): UserEntity {
    return this._userService.updateUserPassword(id, updatePasswordDto);
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'The ID of the user',
  })
  @ApiResponse({ status: 204, description: 'Successful' })
  @ApiResponse({ status: 400, description: 'ID has invalid format' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param('id', UUIDPipe) id: string): void {
    this._userService.deleteUser(id);
  }
}
