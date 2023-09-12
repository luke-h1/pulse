import 'reflect-metadata';
import { Role } from '@prisma/client';
import { db } from '../../db/prisma';
import { ProjectResolver } from '../project/project';
import { generateTestProjects } from '../../test/__data__/project';
import { generateTestUsers } from '../../test/__data__/user';
import {
  createApiMocks,
  createDataLoaderMocks,
  createMockRedis,
} from '../../test/__mocks__/server';
import { Status } from '../../prisma/generated/type-graphql';
import resetDb from '../../test/resetDb';

beforeEach(async () => {
  await resetDb();
});

afterEach(async () => {
  await resetDb();
});

afterAll(async () => {
  await db.$disconnect();
});

describe('project', () => {
  test('countProjects returns count of projects', async () => {
    const resolver = new ProjectResolver();

    const count = await resolver.countProjects();

    expect(count).toEqual({ count: 0 });

    const users = generateTestUsers(5);

    await db.user.createMany({
      data: [...users],
    });

    const projects = generateTestProjects(5);

    projects.forEach((project, i) => {
      // eslint-disable-next-line no-param-reassign
      project.authorId = users[i].id;
    });

    await db.project.createMany({
      // @ts-expect-error - prisma thinks @editorjs blocks are not valid
      data: [...projects],
    });
  });
  test('projects returns all projects', async () => {
    const resolver = new ProjectResolver();

    const users = generateTestUsers(5);

    await db.user.createMany({
      data: [...users],
    });

    const ps = generateTestProjects(5);

    ps.forEach((project, i) => {
      // eslint-disable-next-line no-param-reassign
      project.authorId = users[i].id;
    });

    await db.project.createMany({
      // @ts-expect-error - prisma thinks @editorjs blocks are not valid
      data: [...ps],
    });

    const projects = await resolver.projects();

    expect(projects.length).toEqual(5);

    for (let i = 0; i < projects.length; i += 1) {
      expect(projects[i].title).toEqual(ps[i].title);
      expect(projects[i].intro).toEqual(ps[i].intro);
      expect(projects[i].content).toEqual(ps[i].content);
      expect(projects[i].image).toEqual(ps[i].image);
      expect(projects[i].status).toEqual(ps[i].status);
      expect(projects[i].tags).toEqual(ps[i].tags);
      expect(projects[i].authorId).toEqual(ps[i].authorId);
    }
  });

  test('recentProjects returns 5 most recent projects', async () => {
    const resolver = new ProjectResolver();

    const users = generateTestUsers(50);

    await db.user.createMany({
      data: [...users],
    });

    const ps = generateTestProjects(50);

    ps.forEach((project, i) => {
      // eslint-disable-next-line no-param-reassign
      project.authorId = users[i].id;
      // create new dates with different times for each project
      // eslint-disable-next-line no-param-reassign
      project.createdAt = new Date(new Date().getTime() + i * 1000);
    });

    await db.project.createMany({
      // @ts-expect-error - prisma thinks @editorjs blocks are not valid
      data: [...ps],
    });

    const projects = await resolver.recentProjects();

    expect(projects.length).toEqual(5);
  });

  test('projectSlugs returns all project ids for FE sitemaps', async () => {
    const resolver = new ProjectResolver();

    const users = generateTestUsers(5);

    await db.user.createMany({
      data: [...users],
    });

    const ps = generateTestProjects(5);

    ps.forEach((project, i) => {
      // eslint-disable-next-line no-param-reassign
      project.authorId = users[i].id;
    });

    await db.project.createMany({
      // @ts-expect-error - prisma thinks @editorjs blocks are not valid
      data: [...ps],
    });

    const { ids } = await resolver.projectIds();

    expect(ids.length).toEqual(5);

    for (let i = 0; i < ids.length; i += 1) {
      expect(ids[i]).toEqual(ps[i].id);
    }
  });

  test('searchProjects does text search on title/intro', async () => {
    const resolver = new ProjectResolver();

    const users = generateTestUsers(5);

    await db.user.createMany({
      data: [...users],
    });

    const ps = generateTestProjects(5);

    ps.forEach((project, i) => {
      // eslint-disable-next-line no-param-reassign
      project.authorId = users[i].id;
      // eslint-disable-next-line no-param-reassign
      project.title = `test ${i}`;
    });

    await db.project.createMany({
      // @ts-expect-error - prisma thinks @editorjs blocks are not valid
      data: [...ps],
    });

    const project = await resolver.searchProjects('test');

    expect(project.length).toEqual(5);
    // refine search
    const project2 = await resolver.searchProjects('test 1');

    expect(project2.length).toEqual(1);
  });

  test('project returns a project via slug', async () => {
    const resolver = new ProjectResolver();

    const users = generateTestUsers(5);

    await db.user.createMany({
      data: [...users],
    });

    const ps = generateTestProjects(5);

    ps.forEach((project, i) => {
      // eslint-disable-next-line no-param-reassign
      project.authorId = users[i].id;
    });

    await db.project.createMany({
      // @ts-expect-error - prisma thinks @editorjs blocks are not valid
      data: [...ps],
    });

    const project = await resolver.project(ps[0].id);

    expect(project).toEqual(ps[0]);
  });

  test('createProject', async () => {
    const resolver = new ProjectResolver();

    const user = generateTestUsers(1);

    await db.user.createMany({
      data: [...user],
    });

    const { req, res } = createApiMocks({
      session: {
        userId: user[0].id,
      },
    });

    const redis = createMockRedis();
    const dataLoaderMocks = createDataLoaderMocks();

    const project = generateTestProjects(1);

    project[0].authorId = user[0].id;

    const response = await resolver.createProject(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore - fake lib returns null instead of undefined
      {
        ...project[0],
      },
      {
        req,
        res,
        redis,
        ...dataLoaderMocks,
      },
    );

    expect(response.project).toEqual(project[0]);
  });

  test('updateProject', async () => {
    const resolver = new ProjectResolver();

    const users = generateTestUsers(5);

    await db.user.createMany({
      data: [...users],
    });

    const ps = generateTestProjects(5);

    ps.forEach((project, i) => {
      // eslint-disable-next-line no-param-reassign
      project.authorId = users[i].id;
    });

    await db.project.createMany({
      // @ts-expect-error - prisma thinks @editorjs blocks are not valid
      data: [...ps],
    });

    const { req, res } = createApiMocks({
      session: {
        userId: users[0].id,
      },
    });

    const redis = createMockRedis();
    const dataLoaderMocks = createDataLoaderMocks();

    const response = await resolver.updateProject(
      {
        req,
        res,
        redis,
        ...dataLoaderMocks,
      },
      ps[0].id,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore - fake lib returns null instead of undefined
      {
        ...ps[0],
        status: Status.PUBLISHED,
      },
    );

    expect(response.project).toEqual(ps[0]);
  });

  test('deleteProject', async () => {
    const resolver = new ProjectResolver();

    const users = generateTestUsers(5);

    await db.user.createMany({
      data: [...users],
    });

    const ps = generateTestProjects(5);

    ps.forEach((project, i) => {
      // eslint-disable-next-line no-param-reassign
      project.authorId = users[i].id;
    });

    await db.project.createMany({
      // @ts-expect-error - prisma thinks @editorjs blocks are not valid
      data: [...ps],
    });

    const { req, res } = createApiMocks({
      session: {
        userId: users[0].id,
      },
    });

    const redis = createMockRedis();
    const dataLoaderMocks = createDataLoaderMocks();

    const response = await resolver.deleteProject(
      {
        req,
        res,
        redis,
        ...dataLoaderMocks,
      },
      ps[0].id,
    );

    expect(response).toEqual(true);
  });

  test('deleteAllProjects', async () => {
    const resolver = new ProjectResolver();

    const users = generateTestUsers(5);
    users[0].role = Role.ADMIN;

    await db.user.createMany({
      data: [...users],
    });

    const ps = generateTestProjects(5);

    ps.forEach((project, i) => {
      // eslint-disable-next-line no-param-reassign
      project.authorId = users[i].id;
    });

    await db.project.createMany({
      // @ts-expect-error - prisma thinks @editorjs blocks are not valid
      data: [...ps],
    });

    const { req, res } = createApiMocks({
      session: {
        userId: users[0].id,
      },
    });

    const redis = createMockRedis();
    const dataLoaderMocks = createDataLoaderMocks();

    const response = await resolver.deleteProject(
      {
        req,
        res,
        redis,
        ...dataLoaderMocks,
      },
      ps[0].id,
    );

    expect(response).toEqual(true);
  });
});
