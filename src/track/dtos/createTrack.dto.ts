import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export default class CreateTrackDto {
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
}
