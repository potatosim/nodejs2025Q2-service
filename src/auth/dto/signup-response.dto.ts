import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

@Exclude()
export class SignUpResponseDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  userId: string;
}
