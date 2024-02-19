import {
  Module,
  NestModule,
  DynamicModule,
  MiddlewareConsumer,
} from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { pino, LoggerOptions } from 'pino';

@Module({})
export class PinoLoggerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes('*');
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
              transport: undefined,
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
