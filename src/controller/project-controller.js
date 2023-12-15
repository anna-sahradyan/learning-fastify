const Project = require("../models/project-model");
const User = require("../models/user-model");
const createProject = async (req, reply) => {
    try {
        // Check if project manager exists and has a valid role
        const projectManager = await User.findById(req.body.projectManager);
        if (!projectManager) {
            return reply.status(400).send({message: "Project manager not found"});
        }

        if (!["Admin", "Project Manager"].includes(projectManager.role)) {
            return reply.status(400).send({message: "Invalid role for the project manager"});
        }

        // Check if team members exist
        for (let memberId of req.body.teamMembers) {
            const teamMember = await User.findById(memberId);
            if (!teamMember) {
                return reply.status(400).send({message: `Invalid team member: ${memberId}`});
            }
        }

        // Create the project
        const project = new Project(req.body);
        await project.save();

        reply.send(project);
    } catch (err) {
        // Log the error for debugging purposes
        console.error(err);
        reply.status(400).send({message: "Error creating project"});
    }
};
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
