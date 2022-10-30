import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesModule } from './games/games.module';

@Module({
  imports: [
    GamesModule,
    MongooseModule.forRoot('mongodb://localhost:27017/munily-test'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
