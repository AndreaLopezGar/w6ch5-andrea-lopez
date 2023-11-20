import { createServer } from 'http';
import { app } from './app.js';
import createDebug from 'debug';

const PORT = process.env.PORT || 3030;

const debug = createDebug('JJK:index');
const server = createServer(app);

server.listen(PORT);

server.on('listening', () => {
  debug('Listening on port', PORT);
});
