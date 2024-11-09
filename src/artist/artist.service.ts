import ArtistEntity from './entities/artist.entity';
import { NotFoundException } from '@nestjs/common';
import CreateArtistDto from './dtos/createArtist.dto';
import { v4 as uuid } from 'uuid';
import UpdateArtistDto from './dtos/updateArtist.dto';

export class ArtistService {
  constructor(private readonly _artistDatabase: Map<string, ArtistEntity>) {
    this._artistDatabase = new Map<string, ArtistEntity>();
  }

  getAll(): ArtistEntity[] {
    return Array.from(this._artistDatabase.values());
  }

  getArtistById(id: string): ArtistEntity {
    const value: ArtistEntity = this._artistDatabase.get(id);
    if (value === undefined) {
      throw new NotFoundException();
    }

    return value;
  }

  createArtist(dto: CreateArtistDto): ArtistEntity {
    const artist: ArtistEntity = new ArtistEntity({
      id: uuid(),
      name: dto.name,
      grammy: dto.grammy,
    });

    this._artistDatabase.set(artist.id, artist);
    return artist;
  }

  updateArtist(id: string, dto: UpdateArtistDto): ArtistEntity {
    const value: ArtistEntity = this._artistDatabase.get(id);
    if (value === undefined) {
      throw new NotFoundException();
    }

    if (dto.name !== undefined) {
      value.name = dto.name;
    }

    if (dto.grammy !== undefined) {
      value.grammy = dto.grammy;
    }

    this._artistDatabase.set(id, value);
    return value;
  }

  // TODO: delete artistID from tracks
  deleteArtist(id: string): void {
    const value: ArtistEntity = this._artistDatabase.get(id);
    if (value === undefined) {
      throw new NotFoundException();
    }

    this._artistDatabase.delete(id);
  }
}
