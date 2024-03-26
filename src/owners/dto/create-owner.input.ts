import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateOwnerInput {
  //Graphql field
  @Field()
  name: string;
}
