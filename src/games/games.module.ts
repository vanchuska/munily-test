import { CacheModule, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { MongooseModule } from '@nestjs/mongoose';
// import { redisStore } from 'cache-manager-redis-store';
import { Game, GameSchema } from './entities/game.entity';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import process from 'process';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';
import config from '../config';
import { ConfigType } from '@nestjs/config';

@Module({
    imports:[
        ConfigModule,
      
        CacheModule.registerAsync({
            inject: [config.KEY],
            useFactory: (configService: ConfigType<typeof config>) => ({
              store: redisStore,
              host: configService.host, 
              port: +configService.port,
              isGlobal : true,
            })
          }),
        MongooseModule.forFeature([
            {
                name:Game.name,
                schema:GameSchema,
            },
        ]),
    ],
    controllers : [GamesController],
    providers : [GamesService]
})
export class GamesModule {}
