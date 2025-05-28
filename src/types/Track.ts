import { IAlbum } from './Album';
import { IArtist } from './Artist';

export interface ITrack {
  id: string;
  name: string;
  artistId: IArtist['id'] | null;
  albumId: IAlbum['id'] | null;
  duration: number;
}
