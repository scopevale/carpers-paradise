import Server from './Server';

import Environment from './config/Environment';

const server = new Server(Environment);

server.start();
