#!/usr/bin/env node

const chalk = require('chalk');
const spawn = require('cross-spawn');
const path = require('path');
const { StringStream } = require('scramjet');

const args = process.argv.slice(2);

const projectRoot = path.resolve(__dirname, '..');

const projects = {
  api: {
    path: path.join(projectRoot, 'apps/api'),
    command: 'pnpm dev',
    colour: chalk.green,
  },
  admin: {
    path: path.join(projectRoot, 'apps/admin'),
    command: 'pnpm dev',
    colour: chalk.blue,
  },
  frontend: {
    path: path.join(projectRoot, 'apps/frontend'),
    command: 'pnpm dev',
    colour: chalk.cyan,
  },
};

const labelStream = (stream, project, transform) =>
  StringStream.from(stream)
    .lines()
    .map(
      line =>
        `${projects[project].colour(`[${project}]`)} ${
          typeof transform === 'function' ? transform(line) : line
        }`,
    )
    .toStringStream()
    .append('\n');

const matchingProjects = args.filter(project => !!projects[project]);

if (!matchingProjects.length) {
  console.log('No matching projects found');
  process.exit(0);
}

matchingProjects.forEach((project, index) => {
  setTimeout(() => {
    const subProcess = spawn(projects[project].command, {
      cwd: projects[project].path,
      shell: true,
    });

    labelStream(subProcess.stdout, project).pipe(process.stdout);
    labelStream(
      subProcess.stderr,
      project,
      line => `${chalk.red('[ERROR]')} ${line}`,
    ).pipe(process.stderr);

    process.on('SIGINT', () => {
      subProcess.kill('SIGINT');
      subProcess.on('close', process.exit);
    });
  }, 1000 * index);
});
