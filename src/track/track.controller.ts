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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { AuthGuard } from 'src/auth.quard';

@Controller('track')
@UseGuards(AuthGuard)
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
