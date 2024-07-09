import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Log } from './entities/log.entity';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    @InjectModel(Log) private readonly logModel: typeof Log,
  ) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, headers, body } = request;
    const now = Date.now();

    return next
      .handle()
      .pipe(
        tap(async (data) => {
          const responseTime = Date.now() - now;
          const log = {
            method,
            url,
            headers: JSON.stringify(headers),
            body: JSON.stringify(body),
            responseTime,
          };

          await this.logModel.create(log);
          console.log(`Logged Request: ${method} ${url} - ${responseTime}ms`);
        }),
      );
  }
}
