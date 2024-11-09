import TrackEntity from './entities/track.entity';
import { NotFoundException } from '@nestjs/common';
import CreateTrackDto from './dtos/createTrack.dto';
import { v4 as uuid } from 'uuid';
import UpdateTrackDto from './dtos/updateTrack.dto';

export class TrackService {
  constructor(private readonly _trackDatabase: Map<string, TrackEntity>) {
    this._trackDatabase = new Map<string, TrackEntity>();
  }

  getAll(): TrackEntity[] {
    return Array.from(this._trackDatabase.values());
  }

  getTrackById(id: string): TrackEntity {
    const value: TrackEntity = this._trackDatabase.get(id);

    if (value === undefined) {
      throw new NotFoundException();
    }

    return value;
  }

  createTrack(dto: CreateTrackDto): TrackEntity {
    const track: TrackEntity = new TrackEntity({
      id: uuid(),
      name: dto.name,
      albumId: dto.albumId || null,
      artistId: dto.artistId || null,
      duration: dto.duration,
    });

    this._trackDatabase.set(track.id, track);
    return track;
  }

  updateTrack(id: string, dto: UpdateTrackDto): TrackEntity {
    const value: TrackEntity = this._trackDatabase.get(id);
    if (value === undefined) {
      throw new NotFoundException();
    }

    if (dto.name !== undefined) {
      value.name = dto.name;
    }
    if (dto.artistId !== undefined) {
      value.artistId = dto.artistId;
    }
    if (dto.albumId !== undefined) {
      value.albumId = dto.albumId;
    }
    if (dto.duration !== undefined) {
      value.duration = dto.duration;
    }

    this._trackDatabase.set(id, value);
    return value;
  }

  deleteTrack(id: string): void {
    const value: TrackEntity = this._trackDatabase.get(id);
    if (value === undefined) {
      throw new NotFoundException();
    }

    this._trackDatabase.delete(id);
  }

  deleteArtistId(artistId: string): void {
    this._trackDatabase.forEach((value: TrackEntity, key: string) => {
      if (value.artistId === artistId) {
        value.artistId = artistId;
        this._trackDatabase.set(key, value);
      }
    });
  }
}
