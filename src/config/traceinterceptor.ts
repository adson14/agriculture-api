import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { trace } from '@opentelemetry/api';

@Injectable()
export class TraceInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();

    const span = trace.getActiveSpan();

    if (span) {
      const fullPath = `${request.method} ${request.url || ''}`;
      span.updateName(fullPath);
    }

    return next.handle();
  }
}

@Injectable()
export class TraceExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        const span = trace.getActiveSpan();
        if (span) {
          span.recordException(err);
          span.setStatus({ code: 2, message: err.message });
        }
        return throwError(() => err);
      }),
    );
  }
}
