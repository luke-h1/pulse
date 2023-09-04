import { IncomingMessage, ServerResponse } from 'http';
import next from 'next';
import express from 'express';

async function startServer() {
  const port = process.env.PORT || 3000;
  const dev = process.env.NODE_ENV !== 'production';
  const nextApp = next({ dev });
  const handler = nextApp.getRequestHandler();

  try {
    await nextApp.prepare();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Error starting Next.js server!');
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  }

  const app = express();

  app.get('*', (req: IncomingMessage, res: ServerResponse<IncomingMessage>) =>
    handler(req, res),
  );

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`> Ready on http://localhost:${port}`);
  });
}

startServer();
