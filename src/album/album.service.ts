import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import AlbumEntity from './entities/album.entity';
import CreateAlbumDto from './dtos/createAlbum.dto';
import { v4 as uuid } from 'uuid';
import UpdateAlbumDto from './dtos/updateAlbum.dto';
import TrackEntity from '../track/entities/track.entity';

@Injectable()
export class AlbumService {
  constructor(
    @Inject('ALBUM_DB')
    private readonly _albumDatabase: Map<string, AlbumEntity>,
    @Inject('TRACK_DB')
    private readonly _trackDatabase: Map<string, TrackEntity>,
    @Inject('FAVS_ALBUM_DB')
    private readonly _favsAlbumDatabase: Map<string, AlbumEntity>,
    @Inject('FAVS_TRACK_DB')
    private readonly _favsTrackDatabase: Map<string, TrackEntity>,
  ) {}

  getAll(): AlbumEntity[] {
    return Array.from(this._albumDatabase.values());
  }

  getAlbumById(id: string) {
    const value: AlbumEntity = this._albumDatabase.get(id);
    if (value === undefined) {
      throw new NotFoundException();
    }

    return value;
  }

  createAlbum(dto: CreateAlbumDto) {
    const album: AlbumEntity = new AlbumEntity({
      id: uuid(),
      name: dto.name,
      artistId: dto.artistId,
      year: dto.year,
    });

    this._albumDatabase.set(album.id, album);
    return album;
  }

  updateAlbum(id: string, dto: UpdateAlbumDto) {
    const value: AlbumEntity = this._albumDatabase.get(id);
    if (value === undefined) {
      throw new NotFoundException();
    }

    if (dto.year !== undefined) {
      value.year = dto.year;
    }

    if (dto.name !== undefined) {
      value.name = dto.name;
    }

    if (dto.artistId !== undefined) {
      value.artistId = dto.artistId;
    }

    this._albumDatabase.set(id, value);
    return value;
  }

  deleteAlbum(id: string) {
    const value: AlbumEntity = this._albumDatabase.get(id);
    if (value === undefined) {
      throw new NotFoundException();
    }

    this._trackDatabase.forEach((value: TrackEntity, key: string) => {
      if (value.albumId === id) {
        value.albumId = null;
        this._trackDatabase.set(key, value);
      }
    });

    this._favsTrackDatabase.forEach((value: TrackEntity, key: string) => {
      if (value.albumId === id) {
        value.albumId = null;
        this._trackDatabase.set(key, value);
      }
    });

    this._favsAlbumDatabase.delete(id);
    this._albumDatabase.delete(id);
  }
}
