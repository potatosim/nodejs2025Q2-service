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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  public constructor(private readonly artistsService: ArtistService) {}

  @Get()
  getAllArtists() {
    return this.artistsService.getAllArtists();
  }

  @Get('/:id')
  getArtistById(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    return this.artistsService.getArtistById(id);
  }

  @Post()
  createArtist(
    @Body(
      new ValidationPipe({
        whitelist: true,
      }),
    )
    body: CreateArtistDto,
  ) {
    return this.artistsService.createArtist(body);
  }

  @Put('/:id')
  updateArtist(
    @Param('id', new ParseUUIDPipe())
    id: string,
    @Body(new ValidationPipe()) updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistsService.updateArtist(id, updateArtistDto);
  }

  @Delete('/:id')
  deleteArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.artistsService.deleteArtist(id);
  }
}
