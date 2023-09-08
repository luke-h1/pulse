import { Request, Response } from 'express';
import { Redis } from 'ioredis';
import createUserDataLoader from '../dataloader/createUserLoader';
import createUpvoteLoader from '../dataloader/upvoteLoader';

export type Context = {
  req: Request & { session: { userId: string } };
  redis: Redis;
  res: Response;
  userLoader: ReturnType<typeof createUserDataLoader>;
  upvoteLoader: ReturnType<typeof createUpvoteLoader>;
};
