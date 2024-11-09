import ArtistEntity from '../../artist/entities/artist.entity';
import AlbumEntity from '../../album/entities/album.entity';
import TrackEntity from '../../track/entities/track.entity';

export default class FavsEntity {
  artists: ArtistEntity[];
  albums: AlbumEntity[];
  tracks: TrackEntity[];
}
