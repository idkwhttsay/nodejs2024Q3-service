import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class UpdateAlbumDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ required: false })
  name?: string;

  @IsInt()
  @IsOptional()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ format: 'year', minimum: 1900, required: false })
  year?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ format: 'uuid', type: 'string', required: false })
  artistId?: string | null;
}
