import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { MongoError } from 'mongodb';
import { Request, Response } from 'express';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.code;

    switch (exception.code) {
      case 11000:
        response.status(HttpStatus.BAD_REQUEST).json({
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
          message: 'User exited, please using another email to register',
        });
    }
  }
}
