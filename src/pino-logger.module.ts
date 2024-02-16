import {
  Module,
  NestModule,
  DynamicModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { pino, LoggerOptions } from 'pino';

@Module({})
export class PinoLoggerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply()
      .exclude({
        method: RequestMethod.GET,
        path: '/',
      })
      .forRoutes('*');
  }

  static forSource(config: { source: 'APP' }): DynamicModule {
    return {
      module: PinoLoggerModule,
      imports: [
        LoggerModule.forRootAsync({
          useFactory: () => {
            const options: LoggerOptions = {
              level: 'trace',
              timestamp: pino.stdTimeFunctions.epochTime,
              transport: { target: 'pino/file' }, // <--- enabling or disabling this controls whether Logger works in shutdown hooks or not
            };

            const pinoLogger = pino(options);

            const sourceKey = 'src';

            return {
              pinoHttp: {
                level: options.level,
                timestamp: options.timestamp,
                autoLogging: false,
                logger: pinoLogger.child({
                  [sourceKey]: config.source,
                }),
                quietReqLogger: true,
                genReqId: (m) => m,
              },
              renameContext: 'ctx',
            };
          },
        }),
      ],
    };
  }
}
