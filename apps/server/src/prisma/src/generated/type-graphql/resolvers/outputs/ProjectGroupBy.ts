import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "../../../client";
import { DecimalJSScalar } from "../../scalars";
import { ProjectCountAggregate } from "../outputs/ProjectCountAggregate";
import { ProjectMaxAggregate } from "../outputs/ProjectMaxAggregate";
import { ProjectMinAggregate } from "../outputs/ProjectMinAggregate";

@TypeGraphQL.ObjectType("ProjectGroupBy", {})
export class ProjectGroupBy {
  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  id!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  title!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  slug!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  intro!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  image!: string | null;

  @TypeGraphQL.Field(_type => GraphQLScalars.JSONResolver, {
    nullable: false
  })
  content!: Prisma.JsonValue;

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

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  authorId!: string;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  createdAt!: Date;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  updatedAt!: Date;

  @TypeGraphQL.Field(_type => ProjectCountAggregate, {
    nullable: true
  })
  _count!: ProjectCountAggregate | null;

  @TypeGraphQL.Field(_type => ProjectMinAggregate, {
    nullable: true
  })
  _min!: ProjectMinAggregate | null;

  @TypeGraphQL.Field(_type => ProjectMaxAggregate, {
    nullable: true
  })
  _max!: ProjectMaxAggregate | null;
}
