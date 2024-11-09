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
import { ArtistService } from './artist.service';
import ArtistEntity from './entities/artist.entity';
import CreateArtistDto from './dtos/createArtist.dto';
import UpdateArtistDto from './dtos/updateArtist.dto';
import UUIDPipe from '../../pipes/uuid-validation.pipe';

@Controller('artist')
export class ArtistController {
  constructor(private readonly _artistService: ArtistService) {}

  @Get()
  getAll(): ArtistEntity[] {
    return this._artistService.getAll();
  }

  @Get(':id')
  getArtistById(@Param('id', UUIDPipe) id: string): ArtistEntity {
    return this._artistService.getArtistById(id);
  }

  @Post()
  createArtist(@Body() createTrackDto: CreateArtistDto): ArtistEntity {
    return this._artistService.createArtist(createTrackDto);
  }

  @Put(':id')
  updateArtist(
    @Param('id', UUIDPipe) id: string,
    @Body() updateTrackDto: UpdateArtistDto,
  ): ArtistEntity {
    return this._artistService.updateArtist(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param('id', UUIDPipe) id: string): void {
    this._artistService.deleteArtist(id);
  }
}
