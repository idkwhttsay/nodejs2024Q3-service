import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { DatabaseModule } from '../database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ArtistEntity from './entities/artist.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([ArtistEntity])],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
