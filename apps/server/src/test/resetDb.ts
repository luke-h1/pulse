import { exec } from 'child_process';
import { db } from '../db/prisma';

export default async function resetDb() {
  // nuke the *** out of the test database before each test
  // used in beforeEach() in tests. We run tests sequentially
  // in order for other tests to not collide with each others
  // data
  await db.post.deleteMany();
  await db.user.deleteMany();
  await db.project.deleteMany();
  // exec('pnpm db:migrate');
}
