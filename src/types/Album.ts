import { IArtist } from './Artist';

export interface IAlbum {
  id: string;
  name: string;
  year: number;
  artistId: IArtist['id'] | null; // refers to Artist
}
