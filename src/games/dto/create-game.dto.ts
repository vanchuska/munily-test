import {IsNotEmpty, IsNumber, IsString} from 'class-validator'
import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';
export class CreateGameDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly name : string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly release : string; 
   
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly progress : number; 

    @ApiProperty()
    @IsNotEmpty()
    @IsString({each : true})
    readonly console : string[];
}
