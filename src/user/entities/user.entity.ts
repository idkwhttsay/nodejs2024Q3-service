import { v4 as uuid } from 'uuid';
import { Exclude, Transform } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export default class UserEntity {
  @IsUUID(4)
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Min(1)
  @IsInt()
  @IsNotEmpty()
  version: number;

  @IsDate()
  @IsNotEmpty()
  @Transform((params) => params.value.getTime(), { toPlainOnly: true })
  createdAt: Date;

  @IsDate()
  @IsNotEmpty()
  @Transform((params) => params.value.getTime(), { toPlainOnly: true })
  updatedAt: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  changePassword(newPassword: string) {
    this.password = newPassword;
    this.updatedAt = new Date();
    this.version++;
  }
}
