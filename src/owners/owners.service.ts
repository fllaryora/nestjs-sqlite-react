import { Injectable, Inject , forwardRef} from '@nestjs/common';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { Owner } from './entities/owner.entity';
import { Pet } from 'src/pets/pet.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PetsService } from 'src/pets/pets.service';

@Injectable()
export class OwnersService {

  constructor(
    @InjectRepository(Owner) private ownerRepository: Repository<Owner>,
   // @Inject(forwardRef(() => PetsService))
   // private petService: PetsService
   ){

  }

  async create(createOwnerInput: CreateOwnerInput): Promise<Owner> {
    const newOwner = this.ownerRepository.create(createOwnerInput);
    return this.ownerRepository.save(newOwner);
  }

  async findAll(): Promise<Owner[]> {
    return this.ownerRepository.find();
  }

  async findOne(id: number) : Promise<Owner> {
    return this.ownerRepository.findOneOrFail({where:{id: id}});
  }

  /*
    Permite la busqueda
    */
  //  async getPets(ownerId : number):Promise<Pet[]> {
  //    return this.petService.findByOwner(ownerId);
  // }

  update(id: number, updateOwnerInput: UpdateOwnerInput) {
    return `This action updates a #${id} owner`;
  }

  remove(id: number) {
    return `This action removes a #${id} owner`;
  }
}
