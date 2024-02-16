import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PinoLoggerModule } from './pino-logger.module';

@Module({
  imports: [PinoLoggerModule.forSource({ source: 'APP' })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
