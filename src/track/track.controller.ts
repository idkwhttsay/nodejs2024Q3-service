import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TrackService } from './track.service';
import TrackEntity from './entities/track.entity';
import CreateTrackDto from './dtos/createTrack.dto';
import UpdateTrackDto from './dtos/updateTrack.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly _trackService: TrackService) {}

  @Get()
  getAll(): TrackEntity[] {
    return this._trackService.getAll();
  }

  @Get(':id')
  getTrackById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this._trackService.getTrackById(id);
  }

  @Post()
  createTrack(@Body() createTrackDto: CreateTrackDto): TrackEntity {
    return this._trackService.createTrack(createTrackDto);
  }

  @Put(':id')
  updateTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): TrackEntity {
    return this._trackService.updateTrack(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): void {
    this._trackService.deleteTrack(id);
  }
}
