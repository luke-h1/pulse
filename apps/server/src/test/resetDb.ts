import { exec } from 'child_process';
import { db } from '../db/prisma';

export default async function resetDb() {
  // exec('pnpm db:migrate');
  await db.post.deleteMany();
  await db.user.deleteMany();
  await db.project.deleteMany();
  // exec('pnpm db:migrate');
  // run a prisma migration via the CLI
}
