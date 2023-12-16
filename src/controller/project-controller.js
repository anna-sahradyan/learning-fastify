const Project = require("../models/project-model");
const User = require("../models/user-model");
async function createProject(request, reply) {
    try {
        const projectManager = await User.findById(request.body.projectManager);
        if (
            !projectManager ||
            !["Admin", "Project Manager"].includes(projectManager.role)
        ) {
            return reply.status(400).send({ message: "Invalid project manager" });
        }

        for (let memberId of request.body.teamMembers) {
            const teamMember = await User.findById(memberId);
            if (!teamMember) {
                return reply
                    .status(400)
                    .send({ message: `Invalid team member: ${memberId}` });
            }
        }

        const project = new Project(request.body);
        await project.save();
        reply.send(project);
    } catch (error) {
        reply.status(400).send(error);
    }
}

const getAllProjects = async (req, reply) => {
    try {
        const projects = await Project.find()
            .populate("projectManager", "firstName lastName email")
            .populate("teamMembers", "firstName lastName email role");
        reply.send(projects);
    } catch (error) {
        reply.status(400).send(error);
    }
}
module.exports = {
    createProject,
    getAllProjects
};
