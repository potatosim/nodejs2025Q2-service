import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumService } from './album.service';
import { AuthGuard } from 'src/guards/auth.quard';

@Controller('album')
@UseGuards(AuthGuard)
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
    body: CreateAlbumDto,
  ) {
    return this.albumsService.createAlbum(body);
  }

  @Put('/:id')
  updateAlbum(
    @Param('id', new ParseUUIDPipe())
    id: string,
    @Body(new ValidationPipe()) updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumsService.updateAlbum(id, updateAlbumDto);
  }

  @Delete('/:id')
  deleteAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.albumsService.deleteAlbum(id);
  }
}
