import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PinoLoggerModule } from './pino-logger.module';
import { NestedAppModule } from './nested-app/nested-app.module';
import { GracefulShutdownEventLogger } from '@utils/utils/graceful-event-shutdown-logger';

@Module({
  imports: [PinoLoggerModule.forSource({ source: 'APP' }), NestedAppModule],
  controllers: [AppController],
  providers: [AppService, GracefulShutdownEventLogger],
})
export class AppModule {}
