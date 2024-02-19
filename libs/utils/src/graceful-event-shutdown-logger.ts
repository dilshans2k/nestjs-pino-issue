import {
  BeforeApplicationShutdown,
  Logger,
  OnApplicationShutdown,
  OnModuleDestroy,
} from '@nestjs/common';
import { sleepMs } from 'src/nested-app/nested-app.service';

export class GracefulShutdownEventLogger
  implements OnModuleDestroy, BeforeApplicationShutdown, OnApplicationShutdown
{
  private readonly logger = new Logger(GracefulShutdownEventLogger.name);

  onModuleDestroy() {
    this.logger.log('Graceful shutdown initiated');
    console.log("handling graceful 'Graceful shutdown initiated'");
  }

  beforeApplicationShutdown(signal?: string) {
    this.logger.log(`Graceful shutdown processing for signal: ${signal}`);
    console.log(
      `handling graceful Graceful shutdown processing for signal: ${signal}`,
    );
  }

  async onApplicationShutdown() {
    await sleepMs(500);
    this.logger.log('All Done. Good Bye!');
    console.log("handling graceful 'All Done. Good Bye!'");
  }
}
