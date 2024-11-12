import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { DatabaseModule } from '../database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import TrackEntity from './entities/track.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([TrackEntity])],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
