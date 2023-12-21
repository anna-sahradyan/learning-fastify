'use strict';
const Project = require('../models/project-model');
const User = require('../models/user-model');

//?CREATE PROJECTS
async function createProject(request, reply) {
  try {
    const projectManager = await User.findById(request.body.projectManager);
    if (
      !projectManager ||
      !['Admin', 'Project Manager'].includes(projectManager.role)
    ) {
      return reply.status(400).send({ message: 'Invalid project manager' });
    }

    for (const memberId of request.body.teamMembers) {
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

//?GET ALL PROJECTS
const getAllProjects = async (req, reply) => {
  try {
    const projects = await Project.find()
      .populate('projectManager', 'firstName lastName email')
      .populate('teamMembers', 'firstName lastName email role');
    reply.send(projects);
  } catch (err) {
    reply.status(400).send(err);
  }
};
//?GET ONE PROJECT
const getUserById = async (req, reply) => {
  try {
    const project = await Project.findById(req.params.id);
    reply.send(project);
  } catch (err) {
    reply.status(400).send(err);
  }
};

//?UPDATE
const updateProject = async (req, reply) => {
  try {
    const projectId = req.params.id;
    const updates = req.body;
    if (updates.projectManager) {
      const projectManager = await User.findById(updates.projectManager);
      if (
        !projectManager ||
        !['Admin', 'Project Manager'].includes(projectManager.role)
      ) {
        return reply.status(400).send({ message: 'Invalid project manager' });
      }
    }
    if (updates.teamMembers) {
      for (let memberId of updates.teamMembers) {
        const teamMember = await User.findById(memberId);
        if (!teamMember) {
          return reply
            .status(400)
            .send({ message: `Invalid team member: ${memberId}` });
        }
      }
    }

    const updatedProject = await Project.findByIdAndUpdate(projectId, updates, {
      new: true,
    });

    if (!updatedProject) {
      return reply
        .status(404)
        .send({ message: 'No project with that id found' });
    }

    reply.send(updatedProject);
  } catch (error) {
    reply.status(400).send(error);
  }

};
const deleteProject = async (req, reply) => {
  try {
    const id = req.params.id;
    const deleteProject = await Project.findByIdAndDelete(id);
    if(!deleteProject){
      return reply.status(404).send({message:"No project with that id found "})
    }
    else{
      reply.status(204).send(deleteProject);
    }

  } catch (err) {
    reply.status(400).send(err);
  }

};


module.exports = {
  createProject,
  getAllProjects,
  getUserById,
  updateProject,
  deleteProject
};
