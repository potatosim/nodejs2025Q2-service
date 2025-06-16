import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { LoggingService } from './logging.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, body: requestBody, query } = req;

    const originalSend = res.send;

    res.send = (responseBody, ...args) => {
      const msg = `Request: [${method}] ${originalUrl} | query: ${JSON.stringify(query ?? {})} | body: ${JSON.stringify(requestBody ?? {})} Response: [${res.statusCode}]: ${JSON.stringify(responseBody)}`;

      this.loggingService.log(msg);

      return originalSend.apply(res, [responseBody, ...args]);
    };

    next();
  }
}
