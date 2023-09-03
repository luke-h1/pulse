import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ContentBlockImageCreateNestedManyWithoutPostInput } from "../inputs/ContentBlockImageCreateNestedManyWithoutPostInput";
import { PostCreatetagsInput } from "../inputs/PostCreatetagsInput";
import { Status } from "../../enums/Status";

@TypeGraphQL.InputType("PostCreateWithoutAuthorInput", {})
export class PostCreateWithoutAuthorInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  id?: string | undefined;

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
  image?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  imageFilename?: string | undefined;

  @TypeGraphQL.Field(_type => PostCreatetagsInput, {
    nullable: true
  })
  tags?: PostCreatetagsInput | undefined;

  @TypeGraphQL.Field(_type => GraphQLScalars.JSONResolver, {
    nullable: false
  })
  content!: Prisma.InputJsonValue;

  @TypeGraphQL.Field(_type => Status, {
    nullable: true
  })
  status?: "PUBLISHED" | "DRAFT" | "SCHEDULED" | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  readingTime!: string;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  createdAt?: Date | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  updatedAt?: Date | undefined;

  @TypeGraphQL.Field(_type => ContentBlockImageCreateNestedManyWithoutPostInput, {
    nullable: true
  })
  ContentBlockImage?: ContentBlockImageCreateNestedManyWithoutPostInput | undefined;
}
