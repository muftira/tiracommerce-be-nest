import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const responseMessage = exception.getResponse() as any;

    if (
      Array.isArray(responseMessage.message) &&
      Array.isArray(responseMessage.message[0].errors) &&
      typeof responseMessage.message[0].field === 'string'
    ) {
      response.status(422).json({
        success: false,
        message: 'ValidationException',
        errors: responseMessage.message.map((error: any) => ({
          field: error.field,
          message: error.errors,
        })),
      });
    }

    return exception;
  }
}
