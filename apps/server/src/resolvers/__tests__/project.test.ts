import { Prisma } from '@prisma/client';
import { db } from '../../db/prisma';
import resetDb from '../../test/resetDb';

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

  test('deleteProjectAsAdmin', async () => {});
  test('deleteAllProjects', async () => {});
});
