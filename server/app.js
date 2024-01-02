'use strict';
const fastify = require('fastify')({ logger: true });
const configureDatabase = require('./config/databaseDB');

require('dotenv').config();

const databaseConfig = {
  uri: process.env.MONGODB_URI,
  options: {}
};
const configureRoutes = () => {
  const userRoutes = require('./routes/user-routes');
  const projectRoutes = require('./routes/project-routes');
  fastify.register(userRoutes, { prefix: '/api/v1/users' });
  fastify.register(projectRoutes, { prefix: '/api/v1/projects' });
};


const startServer = async () => {
  try {
    await fastify.listen({
      port: process.env.PORT || 8000,
    });
    fastify.log.info(`Server is running on port ${fastify.server.address().port}`);
  } catch (err) {
    console.error(err);
  }
};

const start = async () => {
  try {
    await configureDatabase(databaseConfig);
    configureRoutes();
    await startServer();
  } catch (err) {
    console.error('Error during startup', err);
    process.exit(1);
  }
};
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('Error closing Mongoose connection', err);
    process.exit(1);
  }
});

start();
