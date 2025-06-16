import { ConsoleLogger, Module } from '@nestjs/common';
import { LoggingService } from './logging.service';

@Module({
  providers: [LoggingService, ConsoleLogger],
  exports: [LoggingService],
})
export class LoggerModule {}
