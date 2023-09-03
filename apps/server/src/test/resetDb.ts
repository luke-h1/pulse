import { db } from '../db/prisma';

export default async function resetDb() {
  await db.post.deleteMany();
  await db.user.deleteMany();
  await db.project.deleteMany();
}
