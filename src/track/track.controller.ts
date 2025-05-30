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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

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
    body: CreateTrackDto,
  ) {
    return this.trackService.createTrack(body);
  }

  @Put('/:id')
  updateTrack(
    @Param('id', new ParseUUIDPipe())
    id: string,
    @Body(new ValidationPipe()) updateTrackDto: UpdateTrackDto,
  ) {
    return this.trackService.updateTrack(id, updateTrackDto);
  }

  @Delete('/:id')
  deleteTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.trackService.deleteTrack(id);
  }
}
