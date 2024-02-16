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
    console.log('consolelog: beforeApplicationShutdown');
    Logger.log('nestjs: beforeApplicationShutdown');
  }
  onApplicationShutdown(signal?: string) {
    console.log('consolelog: onApplicationShutdown');
    Logger.log('nestjs: onApplicationShutdown');
  }
  onModuleDestroy() {
    console.log('consolelog: onModuleDestroy');
    Logger.log('nestjs: onModuleDestroy');
  }
  getHello(): string {
    return 'Hello World!';
  }
}
