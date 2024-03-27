import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
    } from '@nestjs/graphql';
import { OwnersService } from './owners.service';
import { Owner } from './entities/owner.entity';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { Pet } from 'src/pets/pet.entity';

@Resolver((of) => Owner)
export class OwnersResolver {
  constructor(private readonly ownersService: OwnersService) {}

  /*
  mutation{
  createOwner(createOwnerInput : {
    name: "Jose"
  }){name, id,}
  }*/
  @Mutation(() => Owner)
  createOwner(@Args('createOwnerInput') createOwnerInput: CreateOwnerInput) {
    return this.ownersService.create(createOwnerInput);
  }

  /*query{
    owners{name}
  }*/

  @Query(() => [Owner], { name: 'owners' })
  owners() {
    return this.ownersService.findAll();
  }

  //@ResolveField(returns => [Pet])
  // async pets( @Parent() owner: Owner): Promise<Pet[]> {
  //   return owner.pets;   
  //}

  @Query(() => Owner, { name: 'getOwner' })
  getOwner(@Args('id', { type: () => Int }) id: number) {
    return this.ownersService.findOne(id);
  }


}
