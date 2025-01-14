import { DiagConsoleLogger, DiagLogLevel, diag } from '@opentelemetry/api';
import { LoggerService } from '@nestjs/common';

export class OtelLogger implements LoggerService {
  log(message: any, ...optionalParams: any[]) {
    diag.debug(`LOG: ${message}`, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    diag.error(`ERROR: ${message}`, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    diag.warn(`WARN: ${message}`, ...optionalParams);
  }

  debug?(message: any, ...optionalParams: any[]) {
    diag.debug(`DEBUG: ${message}`, ...optionalParams);
  }

  verbose?(message: any, ...optionalParams: any[]) {
    diag.verbose(`VERBOSE: ${message}`, ...optionalParams);
  }
}
