import { Field, InputType } from 'type-graphql';
import { ProjectCreateInput } from './ProjectCreateInput';
import { Status } from '../../../prisma/generated/type-graphql';

@InputType({
  description: 'Project update input data',
  isAbstract: true,
})
export class ProjectUpdateInput extends ProjectCreateInput {
  @Field(() => Status)
  status: Status;
}
