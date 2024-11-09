import { Module } from '@nestjs/common';
import TrackEntity from './track/entities/track.entity';
import UserEntity from './user/entities/user.entity';
import ArtistEntity from './artist/entities/artist.entity';

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

const providers = [
  trackDatabaseProvider,
  userDatabaseProvider,
  artistDatabaseProvider,
];

@Module({
  providers: [...providers],
  exports: [...providers],
})
export class DatabaseModule {}
