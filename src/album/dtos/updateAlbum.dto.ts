import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export default class UpdateAlbumDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsInt()
  @IsOptional()
  @IsPositive()
  @IsNotEmpty()
  year?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  artistId?: string | null;
}
