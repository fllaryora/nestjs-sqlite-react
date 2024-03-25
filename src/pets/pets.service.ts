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
        return this.petRepository.find();
    }

    async createPet(createInput: CreatePetInput):Promise<Pet> {
        const newPet = this.petRepository.create(createInput);
        return this.petRepository.save(newPet);
    }

}
