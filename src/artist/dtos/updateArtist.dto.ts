import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class UpdateArtistDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ required: false })
  name?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false })
  grammy?: boolean;
}
