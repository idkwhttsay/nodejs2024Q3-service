import { Module } from '@nestjs/common';
import TrackEntity from './track/entities/track.entity';
import UserEntity from './user/entities/user.entity';
import ArtistEntity from './artist/entities/artist.entity';
import AlbumEntity from './album/entities/album.entity';

const trackDatabaseProvider = {
  provide: 'TRACK_DB',
  useValue: new Map<string, TrackEntity>(),
};

const userDatabaseProvider = {
  provide: 'USER_DB',
  useValue: new Map<string, UserEntity>(),
};

const artistDatabaseProvider = {
  provide: 'ARTIST_DB',
  useValue: new Map<string, ArtistEntity>(),
};

const albumDatabaseProvider = {
  provide: 'ALBUM_DB',
  useValue: new Map<string, AlbumEntity>(),
};

const FavsAlbumDatabaseProvider = {
  provide: 'FAVS_ALBUM_DB',
  useValue: new Map<string, AlbumEntity>(),
};

const FavsArtistDatabaseProvider = {
  provide: 'FAVS_ARTIST_DB',
  useValue: new Map<string, ArtistEntity>(),
};

const FavsTrackDatabaseProvider = {
  provide: 'FAVS_TRACK_DB',
  useValue: new Map<string, TrackEntity>(),
};

const providers = [
  trackDatabaseProvider,
  userDatabaseProvider,
  artistDatabaseProvider,
  albumDatabaseProvider,
  FavsAlbumDatabaseProvider,
  FavsArtistDatabaseProvider,
  FavsTrackDatabaseProvider,
];

@Module({
  providers: [...providers],
  exports: [...providers],
})
export class DatabaseModule {}
