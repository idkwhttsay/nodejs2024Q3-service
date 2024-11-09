import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class TrackEntity {
  @IsUUID(4)
  @IsNotEmpty()
  @ApiProperty({ format: 'uuid' })
  id: string; // uuid v4

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
  @IsPositive()
  @ApiProperty({ minimum: 1 })
  duration: number; // integer number

  constructor(partial: Partial<TrackEntity>) {
    Object.assign(this, partial);
  }
}
