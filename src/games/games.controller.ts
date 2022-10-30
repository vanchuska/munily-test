import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Controller('games')
export class GamesController {

    constructor(private readonly gamesService : GamesService){}

    @Get()
    findAll (@Query() paginationQuery : PaginationQueryDto) {
        const {limit,offset} = paginationQuery;
        return this.gamesService.findAll(paginationQuery);
    } 

    @Get(':id')
    findOne (@Param('id') id:string) {
       return this.gamesService.findOne(id);        
    }

    
    @Post()
    create (@Body() creategameedto : CreateGameDto) {
        console.log(creategameedto instanceof CreateGameDto)
        return this.gamesService.create(creategameedto);
    }

    @Patch(':id')
    update (@Param('id') id:string, @Body() updateGameDto : UpdateGameDto) {
        // return `probando un patch . ${id} este es el id `;
        return this.gamesService.update(id,updateGameDto);
    }

    
    @Delete(':id')
    remove (@Param('id') id:string) {
        // return `probando un remove. ${id} este es el id `;
        return this.gamesService.remove(id);
    }


}
