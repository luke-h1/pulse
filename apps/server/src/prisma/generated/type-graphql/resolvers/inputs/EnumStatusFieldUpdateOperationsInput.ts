import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { Status } from "../../enums/Status";

@TypeGraphQL.InputType("EnumStatusFieldUpdateOperationsInput", {})
export class EnumStatusFieldUpdateOperationsInput {
  @TypeGraphQL.Field(_type => Status, {
    nullable: true
  })
  set?: "PUBLISHED" | "DRAFT" | "SCHEDULED" | undefined;
}
