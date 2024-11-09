import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsUUID(4)
  @ApiProperty({ format: 'uuid', type: 'string', required: false })
  artistId: string | null; // refers to Artist

  @IsOptional()
  @IsUUID(4)
  @ApiProperty({ format: 'uuid', type: 'string', required: false })
  albumId: string | null; // refers to Album

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @ApiProperty()
  duration: number; // integer number
}
