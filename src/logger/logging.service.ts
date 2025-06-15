import { ConsoleLogger, Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class LoggingService implements LoggerService {
  constructor(private readonly consoleLogger: ConsoleLogger) {}
  log(message: string) {
    this.consoleLogger.log(message);
  }

  fatal(message: string) {
    this.consoleLogger.fatal(message);
  }

  error(message: string) {
    this.consoleLogger.error(message);
  }

  warn(message: string) {
    this.consoleLogger.warn(message);
  }

  debug?(message: string) {
    this.consoleLogger.debug(message);
  }

  verbose?(message: string) {
    this.consoleLogger.verbose(message);
  }
}
