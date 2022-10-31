import { CacheModule, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { MongooseModule } from '@nestjs/mongoose';
// import { redisStore } from 'cache-manager-redis-store';
import { Game, GameSchema } from './entities/game.entity';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';

@Module({
    imports:[
        CacheModule.registerAsync({
            useFactory: () => ({
              store: redisStore,
              host: 'localhost', 
              port: 5003,
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
