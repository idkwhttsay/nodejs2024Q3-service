import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import FavsEntity from './entities/favs.entity';
import UUIDPipe from '../../pipes/uuid-validation.pipe';

@Controller('favs')
export class FavsController {
  constructor(private readonly _favsService: FavsService) {}

  @Get()
  getAll(): FavsEntity {
    return this._favsService.getAll();
  }

  @Post('track/:id')
  addTrackToFavs(@Param('id', UUIDPipe) id: string) {
    return this._favsService.addTrackToFavs(id);
  }

  @Post('artist/:id')
  addArtistToFavs(@Param('id', UUIDPipe) id: string) {
    return this._favsService.addArtistToFavs(id);
  }

  @Post('album/:id')
  addAlbumToFavs(@Param('id', UUIDPipe) id: string) {
    return this._favsService.addAlbumToFavs(id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrackFromFavs(@Param('id', UUIDPipe) id: string) {
    this._favsService.deleteTrackFromFavs(id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbumFromFavs(@Param('id', UUIDPipe) id: string) {
    this._favsService.deleteAlbumFromFavs(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtistFromFavs(@Param('id', UUIDPipe) id: string) {
    this._favsService.deleteArtistFromFavs(id);
  }
}
