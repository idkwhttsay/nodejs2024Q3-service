import { Exclude, Transform } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class UserEntity {
  @IsUUID(4)
  @IsNotEmpty()
  @ApiProperty({ format: 'uuid' })
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  login: string;

  @IsString()
  @IsNotEmpty()
  @Exclude({ toPlainOnly: true })
  @ApiProperty({ writeOnly: true })
  password: string;

  @Min(1)
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ minimum: 1 })
  version: number;

  @IsDate()
  @IsNotEmpty()
  @Transform((params) => params.value.getTime(), { toPlainOnly: true })
  @ApiProperty({ format: 'timestamp' })
  createdAt: Date;

  @IsDate()
  @IsNotEmpty()
  @Transform((params) => params.value.getTime(), { toPlainOnly: true })
  @ApiProperty({ format: 'timestamp' })
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
