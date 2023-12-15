const projectController = require("../controller/project-controller");
const userController = require("../controller/user-controller");

async function routes(fastify, options) {
    fastify.post("/", projectController.createProject);
    fastify.get("/", projectController.getAllProjects);

}

module.exports = routes;