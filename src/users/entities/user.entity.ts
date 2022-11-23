import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose';
import {Game } from '../../games/entities/game.entity';

@Schema() 
export class User extends Document{
    @Prop()
    name : string;

    @Prop()
    email : string;

    @Prop({type : [{ type: Types.ObjectId, ref :Game.name }]})
    games : Types.Array<Game>;
}

export const UserSchema = SchemaFactory.createForClass(User)
