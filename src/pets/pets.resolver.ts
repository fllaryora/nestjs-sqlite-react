import { Args, 
    Mutation, 
    Query,
     Resolver ,
      Int, 
     Parent,
      ResolveField} from '@nestjs/graphql';
import { PetsService } from './pets.service';
import { Pet } from './pet.entity';
import { CreatePetInput } from './dto/create-pet.input';
import { Owner } from 'src/owners/entities/owner.entity';

@Resolver( (of) => Pet)
export class PetsResolver {
    
    constructor(private petsService: PetsService){

    }

    /*
    query{
        pets{name}
    }
    */

    /*query{
        pets{name, owner {name}},
  
    }*/
    @Query(() => [Pet], { name: 'pets' })
    pets():Promise<Pet[]> {
        return this.petsService.findAll();
    }

    /*
    mutation{
  createPet(createPetInput:{
    name: "Enya",
    type: "Perro",
    ownerId: 1
  }){name, id, type}
}
    */

    @Mutation(returns => Pet)
    async createPet(
        @Args('createPetInput') createPetInput: CreatePetInput
        ) :Promise <Pet> {
        return this.petsService.createPet(createPetInput);
    }


    /*
    query{
     getPet (id: 2){
        name
     }
    }*/
    @Query(returns => Pet, { name: 'getPet' })
    getPet(
        @Args('id', {type: () => Int}) id: number
    ):Promise<Pet> {
        return this.petsService.findOne(id);
    }

    @ResolveField(returns => Owner)
    async  owner( @Parent() pet: Pet): Promise<Owner> {
     return this.petsService.getOwner(pet.ownerId);   
    }
}
