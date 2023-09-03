import {
  Arg,
  Authorized,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
} from 'type-graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload-minimal';
import isAuth from '../../middleware/isAuth';
import { db } from '../../db/prisma';
import S3Service from '../../services/S3Service';

@ObjectType()
class ImageSignature {
  @Field(() => String)
  image: string;
}

@InputType()
class ImageCreateInput {
  @Field(() => GraphQLUpload, { nullable: true })
  image: FileUpload;

  @Field(() => String)
  type: 'post' | 'project';
}

@Resolver()
export class ImageResolver {
  @Authorized(isAuth)
  @Mutation(() => ImageSignature)
  async createContentBlockImage(
    @Arg('options') options: ImageCreateInput,
  ): Promise<ImageSignature> {
    const image = await S3Service.uploadImage(
      options.image.createReadStream,
      options.image.fieldName,
      options.type,
    );

    return {
      image: image?.Location as string,
    };
  }
}
