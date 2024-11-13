import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class UpdateTrackDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  name?: string;

  @IsOptional()
  @IsUUID(4)
  @ApiProperty({ format: 'uuid', type: 'string', required: false })
  artistId?: string | null; // refers to Artist

  @IsOptional()
  @IsUUID(4)
  @ApiProperty({ format: 'uuid', type: 'string', required: false })
  albumId?: string | null; // refers to Album

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @ApiProperty({ required: false })
  duration?: number; // integer number
}
