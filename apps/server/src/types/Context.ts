import { Request, Response } from 'express';
import { Redis } from 'ioredis';
import createUserDataLoader from '../dataloader/createUserLoader';

export type Context = {
  req: Request & { session: { userId: string } };
  redis: Redis;
  res: Response;
  userLoader: ReturnType<typeof createUserDataLoader>;
};
