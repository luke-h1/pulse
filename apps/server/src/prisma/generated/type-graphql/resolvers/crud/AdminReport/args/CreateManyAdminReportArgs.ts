import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { AdminReportCreateManyInput } from "../../../inputs/AdminReportCreateManyInput";

@TypeGraphQL.ArgsType()
export class CreateManyAdminReportArgs {
  @TypeGraphQL.Field(_type => [AdminReportCreateManyInput], {
    nullable: false
  })
  data!: AdminReportCreateManyInput[];

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  skipDuplicates?: boolean | undefined;
}
