import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema() 
export class Game extends Document{
    @Prop()
    name : string;

    @Prop()
    release : string;

    @Prop()
    progress : number;
    
    @Prop([String])
    console : string[];
}

export const GameSchema = SchemaFactory.createForClass(Game)