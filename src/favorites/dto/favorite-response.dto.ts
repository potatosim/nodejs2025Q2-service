export class FavoriteResponseDto {
  id: string;
  targetId: string;
  type: 'artists' | 'albums' | 'tracks';
}
