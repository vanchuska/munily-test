import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { redisStore } from 'cache-manager-redis-store';
import * as redisStore from 'cache-manager-redis-store';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesModule } from './games/games.module';
// import type { ClientOpts } from 'redis';


@Module({
  imports: [
    
    GamesModule,
    MongooseModule.forRoot('mongodb://localhost:27017/munily-test'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
