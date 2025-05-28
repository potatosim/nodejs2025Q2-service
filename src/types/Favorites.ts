import { IAlbum } from './Album';
import { IArtist } from './Artist';
import { ITrack } from './Track';

export interface IFavorites {
  artists: IArtist['id'][];
  albums: IAlbum['id'][];
  tracks: ITrack['id'][];
}
