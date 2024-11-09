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
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('track')
@ApiTags('Tracks')
export class TrackController {
  constructor(private readonly _trackService: TrackService) {}

  @ApiOperation({ summary: 'Get all tracks' })
  @ApiResponse({ status: 200, type: [TrackEntity] })
  @Get()
  getAll(): TrackEntity[] {
    return this._trackService.getAll();
  }

  @ApiOperation({ summary: 'Get single track by id' })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'The ID of the track',
  })
  @ApiResponse({ status: 200, type: TrackEntity })
  @ApiResponse({ status: 400, description: 'ID has invalid format' })
  @ApiResponse({ status: 404, description: 'Track not found' })
  @Get(':id')
  getTrackById(@Param('id', UUIDPipe) id: string): TrackEntity {
    return this._trackService.getTrackById(id);
  }

  @ApiOperation({ summary: 'Create track' })
  @ApiResponse({
    status: 201,
    description: 'The track has been created.',
    type: TrackEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'Does not contain required fields',
  })
  @Post()
  createTrack(@Body() createTrackDto: CreateTrackDto): TrackEntity {
    return this._trackService.createTrack(createTrackDto);
  }

  @ApiOperation({ summary: 'Update track' })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'The ID of the track',
  })
  @ApiResponse({ status: 200, type: TrackEntity })
  @ApiResponse({ status: 400, description: 'ID has invalid format' })
  @ApiResponse({ status: 404, description: 'Track not found' })
  @Put(':id')
  updateTrack(
    @Param('id', UUIDPipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): TrackEntity {
    return this._trackService.updateTrack(id, updateTrackDto);
  }

  @ApiOperation({ summary: 'Delete track' })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'The ID of the track',
  })
  @ApiResponse({ status: 204, description: 'Successful' })
  @ApiResponse({ status: 400, description: 'ID has invalid format' })
  @ApiResponse({ status: 404, description: 'Track not found' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param('id', UUIDPipe) id: string): void {
    this._trackService.deleteTrack(id);
  }
}
