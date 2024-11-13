import ArtistEntity from '../../artist/entities/artist.entity';
import AlbumEntity from '../../album/entities/album.entity';
import TrackEntity from '../../track/entities/track.entity';
import { ApiProperty } from '@nestjs/swagger';

export default class FavsEntity {
  @ApiProperty({ type: [ArtistEntity] })
  artists: ArtistEntity[];

  @ApiProperty({ type: [AlbumEntity] })
  albums: AlbumEntity[];

  @ApiProperty({ type: [TrackEntity] })
  tracks: TrackEntity[];
}
