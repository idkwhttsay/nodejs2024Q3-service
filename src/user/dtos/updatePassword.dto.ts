import { IsNotEmpty, IsString } from 'class-validator';

export default class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string; // previous password

  @IsString()
  @IsNotEmpty()
  newPassword: string; // new password
}
