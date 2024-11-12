import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import AlbumEntity from './entities/album.entity';
import CreateAlbumDto from './dtos/createAlbum.dto';
import { v4 as uuid } from 'uuid';
import UpdateAlbumDto from './dtos/updateAlbum.dto';
import TrackEntity from '../track/entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly _albumRepository: Repository<AlbumEntity>,
    @Inject('TRACK_DB')
    private readonly _trackDatabase: Map<string, TrackEntity>,
    @Inject('FAVS_ALBUM_DB')
    private readonly _favsAlbumDatabase: Map<string, AlbumEntity>,
    @Inject('FAVS_TRACK_DB')
    private readonly _favsTrackDatabase: Map<string, TrackEntity>,
  ) {}

  async getAll(): Promise<AlbumEntity[]> {
    return await this._albumRepository.find();
  }

  async getAlbumById(id: string): Promise<AlbumEntity> {
    const value: AlbumEntity = await this._albumRepository.findOneBy({ id });
    if (value === null) {
      throw new NotFoundException();
    }

    return value;
  }

  async createAlbum(dto: CreateAlbumDto): Promise<AlbumEntity> {
    const album: AlbumEntity = new AlbumEntity({
      id: uuid(),
      name: dto.name,
      artistId: dto.artistId,
      year: dto.year,
    });

    return await this._albumRepository.save(album);
  }

  async updateAlbum(id: string, dto: UpdateAlbumDto): Promise<AlbumEntity> {
    const value: AlbumEntity = await this._albumRepository.findOneBy({ id });
    if (value === null) {
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

    return await this._albumRepository.save(value);
  }

  async deleteAlbum(id: string): Promise<void> {
    const value: AlbumEntity = await this._albumRepository.findOneBy({ id });
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
    await this._albumRepository.remove(value);
  }
}
