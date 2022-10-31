import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as redisStore from 'cache-manager-redis-store';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesModule } from './games/games.module';
import { ConfigModule } from '@nestjs/config';
import { environments } from './environments';
import config from './config';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      cache: true,
    }),
    GamesModule,
    MongooseModule.forRoot('mongodb://localhost:27017/munily-test'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
