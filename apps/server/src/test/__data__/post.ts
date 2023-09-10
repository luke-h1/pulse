import { Post } from '@prisma/client';
import { nanoid } from 'nanoid';
import { randMovie, randText } from '@ngneat/falso';
import { Status } from '../../prisma/enums';

/* 
// create post mutation
{
  "options": {
    "content": {
  "time": 1694337540631,
  "blocks": [
    { "id": "OpE2kPz9cJ", "data": { "text": "123123123" }, "type": "paragraph" },
  ],
  "version": "2.27.0",
},
    "image": "https://res.cloudinary.com/dijwzvxur/image/upload/v1694339810/ubssfjf7bhsftn1wyxsa.png",
    "intro": "test",
    "status": "PUBLISHED",
    "tags": ["test"],
    "title": "test"
  }
}
*/

const testContentBlock = {
  time: 1694337540631,
  blocks: [
    { id: 'OpE2kPz9cJ', data: { text: '123123123' }, type: 'paragraph' },
  ],
  version: '2.27.0',
};

export const testPosts: Post[] = [
  {
    id: nanoid(),
    title: randMovie(),
    content: testContentBlock,
    intro: randText(),
    image: '',
    status: Status.PUBLISHED,
    updatedAt: new Date(),
    createdAt: new Date(),
    authorId: nanoid(),
    tags: [],
  },
  {
    id: nanoid(),
    title: randMovie(),
    content: testContentBlock,
    intro: randText(),
    image: '',
    status: Status.PUBLISHED,
    updatedAt: new Date(),
    createdAt: new Date(),
    authorId: nanoid(),
    tags: [],
  },
  {
    id: nanoid(),
    title: randMovie(),
    content: testContentBlock,
    intro: randText(),
    image: '',
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
      content: testContentBlock,
      intro: randText(),
      image: '',
      status: 'PUBLISHED',
      updatedAt: new Date(),
      createdAt: new Date(),
      authorId: nanoid(),
      tags: [],
    });
  }

  return posts;
};
