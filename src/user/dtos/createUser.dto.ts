import { IsNotEmpty, IsString } from 'class-validator';

export default class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
