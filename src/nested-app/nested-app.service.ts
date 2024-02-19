import { Injectable, Logger } from '@nestjs/common';

export const sleepMs = (ms: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), ms);
  });
};

@Injectable()
export class NestedAppService {
  beforeApplicationShutdown(signal?: string) {
    console.log('nestedapp: beforeApplicationShutdown');
    Logger.log('nestedapp: beforeApplicationShutdown');
  }
  onApplicationShutdown(signal?: string) {
    console.log('nestedapp: onApplicationShutdown');
    Logger.log('nestedapp: onApplicationShutdown');
  }
  onModuleDestroy() {
    console.log('nestedapp: onModuleDestroy');
    Logger.log('nestedapp: onModuleDestroy');
  }
}
