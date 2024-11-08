import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export default class TrackEntity {
  @IsUUID(4)
  @IsNotEmpty()
  id: string; // uuid v4

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsUUID(4)
  artistId: string | null; // refers to Artist

  @IsOptional()
  @IsUUID(4)
  albumId: string | null; // refers to Album

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  duration: number; // integer number

  constructor(partial: Partial<TrackEntity>) {
    Object.assign(this, partial);
  }
}
