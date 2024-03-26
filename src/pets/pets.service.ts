import { Injectable } from '@nestjs/common';
import { Pet } from './pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input';
import { OwnersService } from 'src/owners/owners.service';
import { Owner } from 'src/owners/entities/owner.entity';

@Injectable()
export class PetsService {

    constructor(
        @InjectRepository(Pet) private petRepository: Repository<Pet>,
        private ownerService: OwnersService
        ){

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

    async findByOwner(ownerId : number):Promise<Pet[]> {
        //Select * ... limit 1
        //Anyone migrating from NestJs v7 to v9 will 
        //run into this issue because they use different TypeORM versions.
        
        //Old way now it not compile
        //return this.petRepository.findOneOrFail(id);

        //OK
        //return this.petRepository.findOneByOrFail({id:id});

        return this.petRepository.find({where:{ownerId: ownerId}});
    }

    /*
    Permite la busqueda
    */
    async getOwner(ownerId : number):Promise<Owner> {
        return this.ownerService.findOne(ownerId);
    }
}
