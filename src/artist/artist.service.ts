import ArtistEntity from './entities/artist.entity';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import CreateArtistDto from './dtos/createArtist.dto';
import { v4 as uuid } from 'uuid';
import UpdateArtistDto from './dtos/updateArtist.dto';
import TrackEntity from '../track/entities/track.entity';
import AlbumEntity from '../album/entities/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly _artistRepository: Repository<ArtistEntity>,
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

  async getAll(): Promise<ArtistEntity[]> {
    return await this._artistRepository.find();
  }

  async getArtistById(id: string): Promise<ArtistEntity> {
    const value: ArtistEntity = await this._artistRepository.findOneBy({ id });
    if (value === null) {
      throw new NotFoundException();
    }

    return value;
  }

  async createArtist(dto: CreateArtistDto): Promise<ArtistEntity> {
    const artist: ArtistEntity = new ArtistEntity({
      id: uuid(),
      name: dto.name,
      grammy: dto.grammy,
    });

    return await this._artistRepository.save(artist);
  }

  async updateArtist(id: string, dto: UpdateArtistDto): Promise<ArtistEntity> {
    const value: ArtistEntity = await this._artistRepository.findOneBy({ id });
    if (value === null) {
      throw new NotFoundException();
    }

    if (dto.name !== undefined) {
      value.name = dto.name;
    }

    if (dto.grammy !== undefined) {
      value.grammy = dto.grammy;
    }

    return await this._artistRepository.save(value);
  }

  async deleteArtist(id: string): Promise<void> {
    const value: ArtistEntity = await this._artistRepository.findOneBy({ id });
    if (value === null) {
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
    await this._artistRepository.remove(value);
  }
}
