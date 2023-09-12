import { randText } from '@ngneat/falso';
import { Project } from '@prisma/client';
import { nanoid } from 'nanoid';
import { testContentBlock } from './post';
import { Status } from '../../prisma/enums';

export const generateTestProjects = (count: number): Project[] => {
  const projects: Project[] = [];

  for (let i = 0; i < count; i += 1) {
    projects.push({
      id: nanoid(),
      title: randText(),
      intro: randText(),
      content: testContentBlock,
      image: '',
      status: Status.PUBLISHED,
      githubUrl: 'https://github.com/luke-h1/pulse',
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: ['test', 'test2'],
      appStoreUrl: null,
      playStoreUrl: null,
      siteUrl: null,
      authorId: nanoid(),
    });
  }

  return projects;
};
