import {IsString} from 'class-validator'
export class CreateGameDto {
    @IsString()
    readonly name : string;

    @IsString()
    readonly release : string; 
   
    @IsString()
    readonly progress : string; 

    @IsString({each : true})
    readonly console : string[];
}
