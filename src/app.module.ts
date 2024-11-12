import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { UserModule } from './user/user.module';
import { FavsModule } from './favorite/favs.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { EnvironmentModule } from '../infrastructure/configurations/environment.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeormConfig from '../infrastructure/database/typeorm.config';

const domainModules = [
  TrackModule,
  AlbumModule,
  FavsModule,
  ArtistModule,
  UserModule,
];

const infrastructureModules = [
  EnvironmentModule,
  ConfigModule.forRoot({ isGlobal: true }),
  TypeOrmModule.forRoot(typeormConfig),
];

@Module({
  imports: [...domainModules, ...infrastructureModules],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
