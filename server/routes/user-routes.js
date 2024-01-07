'use strict';
const userController = require('../controller/user-controller');
const { protect } = require('../middlewares/auth');

// { preHandler: basicAuth }
async function routes(fastify, options) {
  fastify.get('/', userController.getAllUsers);
  fastify.get('/:id', userController.getUserById);
  fastify.post('/', { preHandler: protect }, userController.createUser);
  fastify.put('/:id', { preHandler: protect }, userController.updateUser);
  fastify.delete('/:id', userController.deleteUser);
}

module.exports = routes;
