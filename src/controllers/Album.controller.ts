import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { AlbumService } from 'src/services/Album.service';

class CreateUpdateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNumber()
  year: number;

  @IsOptional()
  @IsString()
  artistId: string | null;
}

@Controller('album')
export class AlbumController {
  public constructor(private readonly albumsService: AlbumService) {}

  @Get()
  getAllAlbums() {
    return this.albumsService.getAllAlbums();
  }

  @Get('/:id')
  getAlbumById(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    return this.albumsService.getAlbumById(id);
  }

  @Post()
  createAlbum(
    @Body(
      new ValidationPipe({
        whitelist: true,
      }),
    )
    body: CreateUpdateAlbumDto,
  ) {
    return this.albumsService.createAlbum(body);
  }

  @Put('/:id')
  updateAlbum(
    @Param('id', new ParseUUIDPipe())
    id: string,
    @Body(new ValidationPipe()) updateAlbumDto: CreateUpdateAlbumDto,
  ) {
    return this.albumsService.updateAlbum(id, updateAlbumDto);
  }

  @Delete('/:id')
  deleteAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.albumsService.deleteAlbum(id);
  }
}
