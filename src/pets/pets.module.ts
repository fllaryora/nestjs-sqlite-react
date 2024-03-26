import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsResolver } from './pets.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './pet.entity';
import { OwnersModule } from 'src/owners/owners.module';

@Module({
  providers: [PetsService, PetsResolver],
  imports:[
    TypeOrmModule.forFeature(
      [Pet]
    ),
    //in order to reach data from owner table ...
    OwnersModule,
  ],
  //Do not do that in order to avoid circular dependency
  //exports: [PetsService],
})
export class PetsModule {}
