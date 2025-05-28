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
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { TrackService } from 'src/services/Track.service';

class CreateUpdateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  duration: number;
  artistId: string | null;
  albumId: string | null;
}

@Controller('track')
export class TrackController {
  public constructor(private readonly trackService: TrackService) {}

  @Get()
  getAllTracks() {
    return this.trackService.getAllTracks();
  }

  @Get('/:id')
  getTrackById(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    return this.trackService.getTrackById(id);
  }

  @Post()
  createTrack(
    @Body(
      new ValidationPipe({
        whitelist: true,
      }),
    )
    body: CreateUpdateTrackDto,
  ) {
    return this.trackService.createTrack(body);
  }

  @Put('/:id')
  updateTrack(
    @Param('id', new ParseUUIDPipe())
    id: string,
    @Body(new ValidationPipe()) updateTrackDto: CreateUpdateTrackDto,
  ) {
    return this.trackService.updateTrack(id, updateTrackDto);
  }

  @Delete('/:id')
  deleteTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.trackService.deleteTrack(id);
  }
}
