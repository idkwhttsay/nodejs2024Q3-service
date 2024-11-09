import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export default class ArtistEntity {
  @IsUUID(4)
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;

  constructor(partial: Partial<ArtistEntity>) {
    Object.assign(this, partial);
  }
}
