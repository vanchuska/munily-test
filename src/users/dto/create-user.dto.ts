import {IsNotEmpty, IsNumber, IsString} from 'class-validator'
import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';
export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly name : string; 

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly email : string;  


}
