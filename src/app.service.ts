import {
  BeforeApplicationShutdown,
  Injectable,
  Logger,
  OnApplicationShutdown,
  OnModuleDestroy,
} from '@nestjs/common';

@Injectable()
export class AppService
  implements OnApplicationShutdown, OnModuleDestroy, BeforeApplicationShutdown
{
  beforeApplicationShutdown(signal?: string) {
    console.log('app: beforeApplicationShutdown');
    Logger.log('app: beforeApplicationShutdown');
  }
  onApplicationShutdown(signal?: string) {
    console.log('app: onApplicationShutdown');
    Logger.log('app: onApplicationShutdown');
  }
  onModuleDestroy() {
    console.log('app: onModuleDestroy');
    Logger.log('app: onModuleDestroy');
  }
  getHello(): string {
    return 'Hello World!';
  }
}
