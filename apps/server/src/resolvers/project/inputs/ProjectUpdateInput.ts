import { InputType } from 'type-graphql';
import { ProjectCreateInput } from './ProjectCreateInput';

@InputType({
  description: 'Project update input data',
  isAbstract: true,
})
export class ProjectUpdateInput extends ProjectCreateInput {}
