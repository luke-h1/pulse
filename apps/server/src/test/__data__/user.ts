import { User } from '@prisma/client';
import { nanoid } from 'nanoid';
import {
  randEmail,
  randFirstName,
  randLastName,
  randTextRange,
  randUserName,
} from '@ngneat/falso';
import bcrypt from 'bcrypt';
import { AccountStatus, Role } from '../../prisma/enums';

export const testUsers: User[] = [
  {
    id: nanoid(),
    firstName: randFirstName(),
    lastName: randLastName(),
    accountStatus: AccountStatus.ACTIVE,
    email: randEmail(),
    password: bcrypt.hashSync('test', 10),
    bio: randTextRange({ max: 40, min: 20 }),
    createdAt: new Date(),
    updatedAt: new Date(),
    username: randUserName(),
    provider: 'session',
    role: Role.USER,
    image: null,
    github: null,
    location: null,
    twitter: null,
    website: null,
  },
  {
    id: nanoid(),
    firstName: randFirstName(),
    lastName: randLastName(),
    accountStatus: AccountStatus.ACTIVE,
    email: randEmail(),
    password: bcrypt.hashSync('test', 10),
    bio: randTextRange({ max: 40, min: 20 }),
    createdAt: new Date(),
    updatedAt: new Date(),
    username: randUserName(),
    provider: 'session',
    role: Role.USER,
    image: null,
    github: null,
    location: null,
    twitter: null,
    website: null,
  },
  {
    id: nanoid(),
    firstName: randFirstName(),
    lastName: randLastName(),
    accountStatus: AccountStatus.ACTIVE,
    email: randEmail(),
    password: bcrypt.hashSync('test', 10),
    bio: randTextRange({ max: 40, min: 20 }),
    createdAt: new Date(),
    updatedAt: new Date(),
    username: randUserName(),
    provider: 'session',
    role: Role.USER,
    image: null,
    github: null,
    location: null,
    twitter: null,
    website: null,
  },
];

export const generateTestUsers = (amount: number) => {
  const users: User[] = [];
  for (let i = 0; i < amount; i += 1) {
    users.push({
      id: nanoid(),
      firstName: randFirstName(),
      lastName: randLastName(),
      accountStatus: AccountStatus.ACTIVE,
      email: randEmail(),
      password: bcrypt.hashSync('test', 10),
      bio: randTextRange({ max: 40, min: 20 }),
      createdAt: new Date(),
      updatedAt: new Date(),
      username: randUserName(),
      provider: 'session',
      role: Role.USER,
      image: null,
      github: null,
      location: null,
      twitter: null,
      website: null,
    });
  }
  return users;
};
