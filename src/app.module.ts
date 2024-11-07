import { Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { UserModule } from './user/user.module';
import { FavoriteModule } from './favorite/favorite.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';

const modules = [
  TrackModule,
  AlbumModule,
  FavoriteModule,
  ArtistModule,
  UserModule,
];

@Module({
  imports: [...modules],
  // TODO: Exception Filter
  // TODO: Input Validation Factory
})
export class AppModule {}
