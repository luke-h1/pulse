import DataLoader from 'dataloader';
import { Project } from '../prisma/generated/type-graphql';
import { db } from '../db/prisma';

const createProjectDataLoader = (): DataLoader<number, Project> => {
  return new DataLoader<number, Project>(async projectIds => {
    const projects = await db.project.findMany();

    const projectIdsToProject: Record<number, Project> = {};

    projects.forEach(p => {
      const projectIdNum = parseInt(p.id, 10);
      projectIdsToProject[projectIdNum] = p;
    });

    return projectIds.map(projectId => projectIdsToProject[projectId]);
  });
};
export default createProjectDataLoader;
