import { Post } from '@prisma/client';
import { nanoid } from 'nanoid';
import { randMovie, randText } from '@ngneat/falso';
import { Status } from '../../prisma/enums';

export const testPosts: Post[] = [
  {
    id: nanoid(),
    title: randMovie(),
    content: {
      test: randText(),
    },
    intro: randText(),
    image: '',
    readingTime: '10m',
    status: Status.PUBLISHED,
    updatedAt: new Date(),
    createdAt: new Date(),
    authorId: nanoid(),
    tags: [],
  },
  {
    id: nanoid(),
    title: randMovie(),
    content: {
      test: randText(),
    },
    intro: randText(),
    image: '',
    readingTime: '10m',
    status: Status.PUBLISHED,
    updatedAt: new Date(),
    createdAt: new Date(),
    authorId: nanoid(),
    tags: [],
  },
  {
    id: nanoid(),
    title: randMovie(),
    content: {
      test: randText(),
    },
    intro: randText(),
    image: '',
    readingTime: '10m',
    status: Status.PUBLISHED,
    updatedAt: new Date(),
    createdAt: new Date(),
    authorId: nanoid(),
    tags: [],
  },
];

export const generatePosts = (count: number): Post[] => {
  const posts: Post[] = [];

  for (let i = 0; i < count; i += 1) {
    posts.push({
      id: nanoid(),
      title: randMovie(),
      content: {
        test: randText(),
      },
      intro: randText(),
      image: '',
      readingTime: '10m',
      status: 'PUBLISHED',
      updatedAt: new Date(),
      createdAt: new Date(),
      authorId: nanoid(),
      tags: [],
    });
  }

  return posts;
};
