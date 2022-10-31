import { Body, CacheInterceptor, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import {  Inject, CACHE_MANAGER  } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Cache } from 'cache-manager';


@ApiTags('Games')
@Controller('games')
// @UseInterceptors(CacheInterceptor)  // para realizar el uso de cache de fomra automatica
export class GamesController {

    constructor(private readonly gamesService : GamesService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache){}
    

    @Get()
   async findAll (@Query() paginationQuery : PaginationQueryDto) {
        const {limit,offset} = paginationQuery;
        const data = await this.cacheManager.get('all');
        console.log(data);
        if(data) {
          return { 
            data: data,
            dataFrom: 'Redis Cache'
          }
        }

        if(!data){
            const nuData = await this.gamesService.findAll(paginationQuery);
            await this.cacheManager.set('all',nuData , { ttl: 30 });
            return {
              data:nuData, 
              dataFrom: 'mongoDB'
          }
        }

        // return this.gamesService.findAll(paginationQuery);
    } 

    @Get(':id')
    async findOne (@Param('id') id:string) {
        const data = await this.cacheManager.get(id);
        if(data) {
          return { 
            data: data,
            dataFrom: 'Redis Cache'
          }
        }
        if(!data){
            const nuData = await this.gamesService.findOne(id) ;
            await this.cacheManager.set(id,nuData , { ttl: 30 })
            return {
              data:nuData, 
              dataFrom: 'mongoDB'
          }
        }
    }

    
    @Post()
    create (@Body() creategameedto : CreateGameDto) {
        // console.log(creategameedto instanceof CreateGameDto)
        return this.gamesService.create(creategameedto);
    }

    @Patch(':id')
    async update (@Param('id') id:string, @Body() updateGameDto : UpdateGameDto) {
        const updatedData = this.gamesService.update(id,updateGameDto)
        const data = await this.cacheManager.get(id);
        if(data) {
            await this.cacheManager.set(id,updatedData , { ttl: 30 })
        }
        return updatedData ;
    }

    
    @Delete(':id')
    async remove (@Param('id') id:string) {
        const data = await this.cacheManager.get(id);
        if(data) {
            this.cacheManager.del(id);
        }
        return this.gamesService.remove(id);
    }


}
