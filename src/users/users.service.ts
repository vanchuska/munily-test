import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';


@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private readonly usersModel:Model<User>,
    ){}
    
  create(createUserDto: CreateUserDto) {
    const newUser = new this.usersModel(createUserDto);
    return newUser.save();
  }

  findAll(paginationQuery : PaginationQueryDto) {
    const {limit,offset} = paginationQuery;
    return this.usersModel.find().skip(offset).limit(limit).exec();
  }

  async findOne(id : string){
    const user = await this.usersModel.findOne({_id :id}).exec();
    if (!user){
        throw new NotFoundException(`The user whit #${id} not found.`);
    }
    return user;
}

async update(id : string , updateUserDto : UpdateUserDto){
  const existingUser = await  this.usersModel.findOneAndUpdate({ _id: id }, {$set : updateUserDto},{ new : true}).exec();
  if(!existingUser){
      throw new NotFoundException(`The user whit #${id} not found.`);
  }
 return existingUser; 
}


async remove(id : string){
  const user  = await this.findOne(id)
  return user.remove();
}
}
