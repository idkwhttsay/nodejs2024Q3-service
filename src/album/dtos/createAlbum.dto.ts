import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ format: 'year', minimum: 1900 })
  year: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ format: 'uuid', type: 'string', required: false })
  artistId: string | null;
}
