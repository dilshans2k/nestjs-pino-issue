import { Module } from '@nestjs/common';
import { NestedAppService } from './nested-app.service';

@Module({
  imports: [],
  controllers: [],
  providers: [NestedAppService],
})
export class NestedAppModule {}
