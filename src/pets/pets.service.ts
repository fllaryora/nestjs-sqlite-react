import { Injectable } from '@nestjs/common';
import { Pet } from './pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input';

@Injectable()
export class PetsService {

    constructor(@InjectRepository(Pet) private petRepository: Repository<Pet>){

    }

    async findAll():Promise<Pet[]> {
        //select * from pets
        return this.petRepository.find();
    }

    async createPet(createInput: CreatePetInput):Promise<Pet> {
        const newPet = this.petRepository.create(createInput);
        return this.petRepository.save(newPet);
    }

    async findOne(id : number):Promise<Pet> {
        //Select * ... limit 1
        //Anyone migrating from NestJs v7 to v9 will 
        //run into this issue because they use different TypeORM versions.
        
        //Old way now it not compile
        //return this.petRepository.findOneOrFail(id);

        //OK
        //return this.petRepository.findOneByOrFail({id:id});

        return this.petRepository.findOneOrFail({where:{id: id}});
    }
}
