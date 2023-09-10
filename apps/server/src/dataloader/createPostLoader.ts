import DataLoader from 'dataloader';
import { Post } from '../prisma/generated/type-graphql';
import { db } from '../db/prisma';

const createPostLoader = (): DataLoader<number, Post> => {
  return new DataLoader<number, Post>(async postIds => {
    const posts = await db.post.findMany();

    const postIdsToPost: Record<number, Post> = {};

    posts.forEach(p => {
      const postIdNum = parseInt(p.id, 10);
      postIdsToPost[postIdNum] = p;
    });

    return postIds.map(postId => postIdsToPost[postId]);
  });
};
export default createPostLoader;
