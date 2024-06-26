import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse(),
      statusCode = exception.getStatus();

    return response.status(statusCode).json({
      success: false,
      statusCode: statusCode,
      message: exception.message,
      errors: exception.name,
    });
  }
}
