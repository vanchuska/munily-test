import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';

@Injectable()
export class GamesService {
    

constructor(
@InjectModel(Game.name) private readonly gameModel:Model<Game>,
){}

findAll(paginationQuery : PaginationQueryDto){
    const {limit,offset} = paginationQuery;
    return this.gameModel.find().skip(offset).limit(limit).exec();
}

async findOne(id : string){
    const game = await this.gameModel.findOne({_id :id}).exec();
    if (!game){
        throw new NotFoundException(`The Game whit #${id} not found.`);
    }
    return game;
}

create(createGameDto : CreateGameDto){
    const game = new this.gameModel(createGameDto)
   return game.save(); 
}

async update(id : string , updateGameDto : UpdateGameDto){
    const existingGame = await  this.gameModel.findOneAndUpdate({ _id: id }, {$set : updateGameDto},{ new : true}).exec();
    if(!existingGame){
        throw new NotFoundException(`The Game whit #${id} not found.`);
    }
   return existingGame; 
}

async remove(id : string){
    const game  = await this.findOne(id)
    return game.remove();
}

}

