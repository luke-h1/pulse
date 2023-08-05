import { Request, Response } from 'express';
import { Redis } from 'ioredis';

export type Context = {
  req: Request & { session: { userId: string } };
  redis: Redis;
  res: Response;
};
