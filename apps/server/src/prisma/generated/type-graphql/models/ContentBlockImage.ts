import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";
import { Post } from "../models/Post";
import { Project } from "../models/Project";

@TypeGraphQL.ObjectType("ContentBlockImage", {})
export class ContentBlockImage {
  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  id!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  image?: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  imageFilename?: string | null;

  post?: Post;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  postId!: string;

  project?: Project | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  projectId?: string | null;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  createdAt!: Date;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  updatedAt!: Date;
}
