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
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ArtistService } from 'src/services/Artist.service';

class CreateUpdateArtistDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsBoolean()
  grammy: boolean;
}

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
    body: CreateUpdateArtistDto,
  ) {
    return this.artistsService.createArtist(body);
  }

  @Put('/:id')
  updateArtist(
    @Param('id', new ParseUUIDPipe())
    id: string,
    @Body(new ValidationPipe()) updateArtistDto: CreateUpdateArtistDto,
  ) {
    return this.artistsService.updateArtist(id, updateArtistDto);
  }

  @Delete('/:id')
  deleteArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.artistsService.deleteArtist(id);
  }
}
