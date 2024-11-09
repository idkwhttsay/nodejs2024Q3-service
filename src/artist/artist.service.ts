import ArtistEntity from './entities/artist.entity';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import CreateArtistDto from './dtos/createArtist.dto';
import { v4 as uuid } from 'uuid';
import UpdateArtistDto from './dtos/updateArtist.dto';
import TrackEntity from '../track/entities/track.entity';
import AlbumEntity from '../album/entities/album.entity';

@Injectable()
export class ArtistService {
  constructor(
    @Inject('ARTIST_DB')
    private readonly _artistDatabase: Map<string, ArtistEntity>,
    @Inject('TRACK_DB')
    private readonly _trackDatabase: Map<string, TrackEntity>,
    @Inject('ALBUM_DB')
    private readonly _albumDatabase: Map<string, AlbumEntity>,
    @Inject('FAVS_ALBUM_DB')
    private readonly _favsAlbumDatabase: Map<string, AlbumEntity>,
    @Inject('FAVS_ARTIST_DB')
    private readonly _favsArtistDatabase: Map<string, ArtistEntity>,
    @Inject('FAVS_TRACK_DB')
    private readonly _favsTrackDatabase: Map<string, TrackEntity>,
  ) {}

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

  deleteArtist(id: string): void {
    const value: ArtistEntity = this._artistDatabase.get(id);
    if (value === undefined) {
      throw new NotFoundException();
    }

    this._trackDatabase.forEach((value: TrackEntity, key: string) => {
      if (value.artistId === id) {
        value.artistId = null;
        this._trackDatabase.set(key, value);
      }
    });

    this._favsTrackDatabase.forEach((value: TrackEntity, key: string) => {
      if (value.artistId === id) {
        value.artistId = null;
        this._trackDatabase.set(key, value);
      }
    });

    this._albumDatabase.forEach((value: AlbumEntity, key: string) => {
      if (value.artistId === id) {
        value.artistId = null;
        this._albumDatabase.set(key, value);
      }
    });

    this._favsAlbumDatabase.forEach((value: AlbumEntity, key: string) => {
      if (value.artistId === id) {
        value.artistId = null;
        this._albumDatabase.set(key, value);
      }
    });

    this._favsArtistDatabase.delete(id);
    this._artistDatabase.delete(id);
  }
}
