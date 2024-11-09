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
import { AlbumService } from './album.service';
import CreateAlbumDto from './dtos/createAlbum.dto';
import UpdateAlbumDto from './dtos/updateAlbum.dto';
import AlbumEntity from './entities/album.entity';
import UUIDPipe from '../../pipes/uuid-validation.pipe';

@Controller('album')
export class AlbumController {
  constructor(private readonly _albumService: AlbumService) {}

  @Get()
  getAll(): AlbumEntity[] {
    return this._albumService.getAll();
  }

  @Get(':id')
  getArtistById(@Param('id', UUIDPipe) id: string): AlbumEntity {
    return this._albumService.getAlbumById(id);
  }

  @Post()
  createArtist(@Body() createAlbumDto: CreateAlbumDto): AlbumEntity {
    return this._albumService.createAlbum(createAlbumDto);
  }

  @Put(':id')
  updateArtist(
    @Param('id', UUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): AlbumEntity {
    return this._albumService.updateAlbum(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param('id', UUIDPipe) id: string): void {
    this._albumService.deleteAlbum(id);
  }
}
