import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PetsService } from './pets.service';
import { Pet } from './pet.entity';
import { CreatePetInput } from './dto/create-pet.input';

@Resolver(of => Pet)
export class PetsResolver {
    constructor(private petsService: PetsService){

    }

    /*
    query{
        pets{name}
    }
    */
    @Query(returns => [Pet])
    pets():Promise<Pet[]> {
        return this.petsService.findAll();
    }

    /*
    mutation{
  createPet(createPetInput:{
    name: "Enya",
    type: "Perro"
  }){name, id, type}
}
    */

    @Mutation(returns => Pet)
    async createPet(
        @Args('createPetInput') createPetInput: CreatePetInput
        ) :Promise <Pet> {
        return this.petsService.createPet(createPetInput);
    }
}
