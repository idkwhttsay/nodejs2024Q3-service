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

  getTrackById(id: string) {
    const value: TrackEntity = this._trackDatabase.get(id);

    if (value === undefined) {
      throw new NotFoundException();
    }

    return value;
  }

  createTrack(createTrackDto: CreateTrackDto): TrackEntity {
    console.log(createTrackDto);

    const track: TrackEntity = new TrackEntity({
      id: uuid(),
      name: createTrackDto.name,
      albumId: createTrackDto.albumId || null,
      artistId: createTrackDto.artistId || null,
      duration: createTrackDto.duration,
    });

    this._trackDatabase.set(track.id, track);
    return track;
  }

  updateTrack(id: string, updateTrackDto: UpdateTrackDto) {
    const value: TrackEntity = this._trackDatabase.get(id);
    if (value === undefined) {
      throw new NotFoundException();
    }

    if (updateTrackDto.name !== undefined) {
      value.name = updateTrackDto.name;
    }
    if (updateTrackDto.artistId !== undefined) {
      value.artistId = updateTrackDto.artistId;
    }
    if (updateTrackDto.albumId !== undefined) {
      value.albumId = updateTrackDto.albumId;
    }
    if (updateTrackDto.duration !== undefined) {
      value.duration = updateTrackDto.duration;
    }

    this._trackDatabase.set(id, value);
    return value;
  }

  deleteTrack(id: string) {
    const value: TrackEntity = this._trackDatabase.get(id);
    if (value === undefined) {
      throw new NotFoundException();
    }

    this._trackDatabase.delete(id);
  }
}
