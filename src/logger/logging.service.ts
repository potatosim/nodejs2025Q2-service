import { ConsoleLogger, Injectable, LoggerService } from '@nestjs/common';
import {
  appendFileSync,
  existsSync,
  mkdirSync,
  renameSync,
  statSync,
} from 'fs';

import { ConfigService } from '@nestjs/config';
import { join } from 'path';

const enum LOG_LEVELS {
  LOG,
  FATAL,
  ERROR,
  WARN,
  DEBUG,
  VERBOSE,
}

@Injectable()
export class LoggingService implements LoggerService {
  private readonly LOG_LEVEL: number;
  private readonly LOG_MAX_SIZE: number;
  private readonly LOG_DIR: string;
  private readonly APP_LOG: string;
  private readonly ERROR_LOG: string;

  constructor(
    private readonly consoleLogger: ConsoleLogger,
    private readonly configService: ConfigService,
  ) {
    this.LOG_LEVEL = this.configService.get('LOG_LEVEL');
    this.LOG_MAX_SIZE = this.parseSize(
      this.configService.get('LOG_MAX_SIZE') || '5m',
    );
    this.LOG_DIR = join(process.cwd(), 'logs');
    this.APP_LOG = join(this.LOG_DIR, 'app.log');
    this.ERROR_LOG = join(this.LOG_DIR, 'error.log');

    if (!existsSync(this.LOG_DIR)) {
      mkdirSync(this.LOG_DIR);
    }
  }

  log(message: string) {
    if (this.LOG_LEVEL >= LOG_LEVELS.LOG) {
      const msg = this.format('log', message);
      this.consoleLogger.log(msg);
      this.writeLog(this.APP_LOG, msg);
    }
  }

  fatal(message: string) {
    if (this.LOG_LEVEL >= LOG_LEVELS.FATAL) {
      const msg = this.format('fatal', message);
      this.consoleLogger.fatal(msg);
      this.writeLog(this.APP_LOG, msg);
    }
  }

  error(message: string) {
    if (this.LOG_LEVEL >= LOG_LEVELS.ERROR) {
      const msg = this.format('error', message);
      this.consoleLogger.error(msg);
      this.writeLog(this.APP_LOG, msg);
      this.writeLog(this.ERROR_LOG, msg);
    }
  }

  warn(message: string) {
    if (this.LOG_LEVEL >= LOG_LEVELS.WARN) {
      const msg = this.format('warn', message);
      this.consoleLogger.warn(msg);
      this.writeLog(this.APP_LOG, msg);
    }
  }

  debug(message: string) {
    if (this.LOG_LEVEL >= LOG_LEVELS.DEBUG) {
      const msg = this.format('debug', message);
      this.consoleLogger.debug(msg);
      this.writeLog(this.APP_LOG, msg);
    }
  }

  verbose(message: string) {
    if (this.LOG_LEVEL >= LOG_LEVELS.VERBOSE) {
      const msg = this.format('verbose', message);
      this.consoleLogger.log(msg);
      this.writeLog(this.APP_LOG, msg);
    }
  }

  private format(level: string, message: string) {
    return `[${new Date().toISOString()}]: ${message}`;
  }

  private parseSize(sizeStr: string): number {
    const m = sizeStr.match(/^(\d+)([kKmMgG])?$/);

    if (!m) {
      return 5 * 1024 * 1024;
    }

    const num = parseInt(m[1], 10);

    const unit = m[2]?.toLowerCase();

    switch (unit) {
      case 'k':
        return num * 1024;
      case 'm':
        return num * 1024 * 1024;
      case 'g':
        return num * 1024 * 1024 * 1024;
      default:
        return num;
    }
  }

  private rotateIfNeeded(filePath: string) {
    if (existsSync(filePath)) {
      const stats = statSync(filePath);
      if (stats.size >= this.LOG_MAX_SIZE) {
        const ts = new Date().toISOString().replace(/[:.]/g, '-');
        renameSync(filePath, `${filePath.replace('.log', '')}-${ts}.log`);
      }
    }
  }

  private writeLog(filePath: string, message: string) {
    this.rotateIfNeeded(filePath);
    appendFileSync(filePath, message + '\n');
  }
}
