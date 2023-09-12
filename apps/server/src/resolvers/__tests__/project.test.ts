import { db } from '../../db/prisma';
import resetDb from '../../test/resetDb';
import { ProjectResolver } from '../project/project';

beforeEach(async () => {
  await resetDb();
});

afterAll(async () => {
  await db.$disconnect();
});

describe('project', () => {
  test('countProjects returns count of projects', async () => {});
  test('projects returns all projects', async () => {});

  test('recentProjects returns 5 most recent projects', async () => {});

  test('projectSlugs returns all project slugs', async () => {});

  test('searchProjects does full text search on title/intro', async () => {});

  test('project returns a project via slug', async () => {});

  test('createProject', async () => {});

  test('createProject', async () => {});

  test('updateProject', async () => {});

  test('deleteProject', async () => {});

  describe('deleteProjectAsAdmin', async () => {
    test('deletes project if user is admin', async () => {
      const resolver = new ProjectResolver();
    });
  });
  test('deleteAllProjects', async () => {});
});
