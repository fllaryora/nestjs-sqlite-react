import { Module } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { OwnersResolver } from './owners.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from './entities/owner.entity';
import { PetsModule } from 'src/pets/pets.module';

@Module({
  providers: [OwnersResolver, OwnersService],
  imports: [
    TypeOrmModule.forFeature(
      [Owner]
    ),
    //Do not do that avoid circular dependency
    //PetsModule,
  ],
  //in order to Pet table be able to search data from owners ...
  exports: [OwnersService],
})
export class OwnersModule {}
