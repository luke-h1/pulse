import { Request, Response } from 'express';
import { Redis } from 'ioredis';
import createUserDataLoader from '../dataloader/createUserLoader';
import createPostLoader from '../dataloader/createPostLoader';

export type Context = {
  req: Request & { session: { userId: string } };
  redis: Redis;
  res: Response;
  userLoader: ReturnType<typeof createUserDataLoader>;
  postLoader: ReturnType<typeof createPostLoader>;
};
