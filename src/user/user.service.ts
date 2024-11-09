import UserEntity from './entities/user.entity';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import CreateUserDto from './dtos/createUser.dto';
import UpdatePasswordDto from './dtos/updatePassword.dto';

export class UserService {
  constructor(protected _userDatabase: Map<string, UserEntity>) {
    this._userDatabase = new Map<string, UserEntity>();
  }

  getAll(): UserEntity[] {
    return Array.from(this._userDatabase.values());
  }

  getUserById(id: string): UserEntity {
    const value: UserEntity = this._userDatabase.get(id);
    if (value === undefined) {
      throw new NotFoundException();
    }

    return value;
  }

  createUser(dto: CreateUserDto): UserEntity {
    const user: UserEntity = new UserEntity({
      id: uuid(),
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    this._userDatabase.set(user.id, user);
    return user;
  }

  updateUserPassword(id: string, dto: UpdatePasswordDto): UserEntity {
    const value: UserEntity = this._userDatabase.get(id);
    if (value === undefined) {
      throw new NotFoundException();
    }

    if (value.password !== dto.oldPassword) {
      throw new ForbiddenException();
    }

    value.changePassword(dto.newPassword);
    return value;
  }

  deleteUser(id: string): void {
    const value: UserEntity = this._userDatabase.get(id);
    if (value === undefined) {
      throw new NotFoundException();
    }

    this._userDatabase.delete(id);
  }
}
