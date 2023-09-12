import { Request, Response } from 'express';
import { Redis } from 'ioredis';
import createUserDataLoader from '../dataloader/createUserLoader';
import createPostDataLoader from '../dataloader/createPostDataLoader';
import createProjectDataLoader from '../dataloader/createProjectDataLoader';

export type Context = {
  req: Request & { session: { userId: string } };
  redis: Redis;
  res: Response;
  userLoader: ReturnType<typeof createUserDataLoader>;
  postLoader: ReturnType<typeof createPostDataLoader>;
  projectLoader: ReturnType<typeof createProjectDataLoader>;
};
