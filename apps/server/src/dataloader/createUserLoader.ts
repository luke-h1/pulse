import { User } from '@prisma/client';
import DataLoader from 'dataloader';
import { db } from '../db/prisma';
import logger from '../utils/logger';

/**
 * Creates a DataLoader instance for efficiently loading and caching User objects by user IDs.
 *
 * @returns {DataLoader<number, User>} A DataLoader instance.
 * 
 * i.e. 
 * SELECT * FROM users WHERE id = 1; # 30ms
   SELECT * FROM users WHERE id = 2; # 30ms
   SELECT * FROM users WHERE id = 3; # 30ms
 * 
 * becomes
 * 
 * SELECT * FROM users WHERE id IN (1, 2, 3); # 90ms :)
 */
const createUserDataLoader = (): DataLoader<number, User> => {
  return new DataLoader<number, User>(async userIds => {
    const users = await db.user.findMany();

    const userIdToUser: Record<number, User> = {};

    users.forEach(u => {
      logger.info(`createUserDataLoader: u.id: ${u.id}`);
      const userIdNum = parseInt(u.id, 10);
      userIdToUser[userIdNum] = u;
    });

    return userIds.map(userId => userIdToUser[userId]);
  });
};

export default createUserDataLoader;
