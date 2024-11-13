import {
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import AlbumEntity from '../album/entities/album.entity';
import TrackEntity from '../track/entities/track.entity';
import ArtistEntity from '../artist/entities/artist.entity';
import FavsEntity from './entities/favs.entity';

@Injectable()
export class FavsService {
  constructor(
    @Inject('FAVS_ALBUM_DB')
    private readonly _favsAlbumDatabase: Map<string, AlbumEntity>,
    @Inject('FAVS_ARTIST_DB')
    private readonly _favsArtistDatabase: Map<string, ArtistEntity>,
    @Inject('FAVS_TRACK_DB')
    private readonly _favsTrackDatabase: Map<string, TrackEntity>,
    @Inject('TRACK_DB')
    private readonly _trackDatabase: Map<string, TrackEntity>,
    @Inject('ARTIST_DB')
    private readonly _artistDatabase: Map<string, ArtistEntity>,
    @Inject('ALBUM_DB')
    private readonly _albumDatabase: Map<string, AlbumEntity>,
  ) {}

  getAll(): FavsEntity {
    return {
      artists: Array.from(this._favsArtistDatabase.values()),
      albums: Array.from(this._favsAlbumDatabase.values()),
      tracks: Array.from(this._favsTrackDatabase.values()),
    } as FavsEntity;
  }

  addTrackToFavs(id: string): TrackEntity {
    const value: TrackEntity = this._trackDatabase.get(id);
    if (value === undefined) {
      throw new UnprocessableEntityException();
    }

    this._favsTrackDatabase.set(id, value);
    return value;
  }

  addAlbumToFavs(id: string): AlbumEntity {
    const value: AlbumEntity = this._albumDatabase.get(id);
    if (value === undefined) {
      throw new UnprocessableEntityException();
    }

    this._favsAlbumDatabase.set(id, value);
    return value;
  }

  addArtistToFavs(id: string): ArtistEntity {
    const value: ArtistEntity = this._artistDatabase.get(id);
    if (value === undefined) {
      throw new UnprocessableEntityException();
    }

    this._favsArtistDatabase.set(id, value);
    return value;
  }

  deleteTrackFromFavs(id: string) {
    const value: TrackEntity = this._favsTrackDatabase.get(id);
    if (value === undefined) {
      throw new NotFoundException();
    }

    this._favsTrackDatabase.delete(id);
  }

  deleteArtistFromFavs(id: string) {
    const value: ArtistEntity = this._favsArtistDatabase.get(id);
    if (value === undefined) {
      throw new NotFoundException();
    }

    this._favsArtistDatabase.delete(id);
  }

  deleteAlbumFromFavs(id: string) {
    const value: AlbumEntity = this._favsAlbumDatabase.get(id);
    if (value === undefined) {
      throw new NotFoundException();
    }

    this._favsAlbumDatabase.delete(id);
  }
}
