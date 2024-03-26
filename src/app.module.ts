import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { GraphQLModule, } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PetsModule } from './pets/pets.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnersModule } from './owners/owners.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      //include: [CatsModule],
      //autoSchemaFile: true,//the schema can be generated on-the-fly in memory
      //sortSchema: true,
      //autoSchemaFile: 'schema.gql',//the file is automatically generated
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    PetsModule,
    TypeOrmModule.forRoot(
      {
        type: 'sqlite',
        database: ':memory', //restart everytime
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
      }
    ),
    OwnersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
