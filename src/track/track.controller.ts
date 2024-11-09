import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TrackService } from './track.service';
import TrackEntity from './entities/track.entity';
import CreateTrackDto from './dtos/createTrack.dto';
import UpdateTrackDto from './dtos/updateTrack.dto';
import UUIDPipe from '../../pipes/uuid-validation.pipe';

@Controller('track')
export class TrackController {
  constructor(private readonly _trackService: TrackService) {}

  @Get()
  getAll(): TrackEntity[] {
    return this._trackService.getAll();
  }

  @Get(':id')
  getTrackById(@Param('id', UUIDPipe) id: string): TrackEntity {
    return this._trackService.getTrackById(id);
  }

  @Post()
  createTrack(@Body() createTrackDto: CreateTrackDto): TrackEntity {
    return this._trackService.createTrack(createTrackDto);
  }

  @Put(':id')
  updateTrack(
    @Param('id', UUIDPipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): TrackEntity {
    return this._trackService.updateTrack(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param('id', UUIDPipe) id: string): void {
    this._trackService.deleteTrack(id);
  }
}
