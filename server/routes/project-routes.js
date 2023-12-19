'use strict';
const projectController = require('../controller/project-controller');


async function routes(fastify, options) {
  fastify.post('/', projectController.createProject);
  fastify.get('/', projectController.getAllProjects);
  fastify.get('/:id', projectController.getUserById);
  fastify.put('/:id', projectController.updateProject);

}

module.exports = routes;
