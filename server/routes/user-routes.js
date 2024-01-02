'use strict';
const userController = require('../controller/user-controller');
const { basicAuth, apiKeyAuth } = require('../middlewares/auth');

async function routes(fastify, options) {
  fastify.get('/', userController.getAllUsers);
  fastify.get('/:id', userController.getUserById);
  fastify.post('/', { preHandler: apiKeyAuth}, userController.createUser);
  fastify.put('/:id', userController.updateUser);
  fastify.delete('/:id', userController.deleteUser);
}

module.exports = routes;
