import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { Status } from "../../enums/Status";

@TypeGraphQL.ObjectType("ProjectMinAggregate", {})
export class ProjectMinAggregate {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  id!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  title!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  intro!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  image!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  githubUrl!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  siteUrl!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  appStoreUrl!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  playStoreUrl!: string | null;

  @TypeGraphQL.Field(_type => Status, {
    nullable: true
  })
  status!: "PUBLISHED" | "DRAFT" | "SCHEDULED" | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  readingTime!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  authorId!: string | null;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  createdAt!: Date | null;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  updatedAt!: Date | null;
}
