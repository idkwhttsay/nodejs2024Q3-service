import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { UserModule } from './user/user.module';
import { FavsModule } from './favorite/favs.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';

const modules = [
  TrackModule,
  AlbumModule,
  FavsModule,
  ArtistModule,
  UserModule,
];

// TODO: add examples and DTOs to swagger

@Module({
  imports: [
    ...modules,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
