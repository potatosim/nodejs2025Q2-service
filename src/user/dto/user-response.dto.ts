import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class UserResponseDto {
  @Expose()
  id: string;
  @Expose()
  login: string;
  @Expose()
  version: number;
  @Expose()
  @Transform(({ value }) => Number(value))
  createdAt: number;
  @Expose()
  @Transform(({ value }) => Number(value))
  updatedAt: number;
}
