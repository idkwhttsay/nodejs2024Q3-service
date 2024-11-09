import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export default class UpdateArtistDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsBoolean()
  grammy?: boolean;
}
