import { Field, InputType } from "@nestjs/graphql";
import { IsAlpha } from "class-validator";

//Graphql inputtype
@InputType()
export class CreatePetInput {
    //Graphql (az-AZ) only
    @IsAlpha()
    //Graphql field
    @Field()
    name: string;

    //Graphql field
    @Field({nullable:true})
    type?:string;
}