import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AdminReportCreateManyAuthorInput } from "../inputs/AdminReportCreateManyAuthorInput";

@TypeGraphQL.InputType("AdminReportCreateManyAuthorInputEnvelope", {})
export class AdminReportCreateManyAuthorInputEnvelope {
  @TypeGraphQL.Field(_type => [AdminReportCreateManyAuthorInput], {
    nullable: false
  })
  data!: AdminReportCreateManyAuthorInput[];

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  skipDuplicates?: boolean | undefined;
}
