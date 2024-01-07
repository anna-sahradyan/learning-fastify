'use strict';
const User = require('../models/user-model');
const jwt = require('jsonwebtoken');
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.APIKEY, { expiresIn: '1d' });
};

async function getAllUsers(req, reply) {
  try {
    const users = await User.find();
    reply.send(users);
  } catch (err) {
    reply.status(500).send(err);

  }

};

async function getUserById(req, reply) {
  try {
    const user = await User.findById(req.params.id);
    reply.send(user);
  } catch (err) {
    reply.status(500).send(err);

  }

}
async function createUser(req, reply) {
  try {
    const { firstName, lastName, email, role, password } = req.body;

    if (!firstName || !email || !lastName) {
      reply.code(400);
      throw new Error('Please fill in all required fields');
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
      reply.code(400);
      throw new Error('Email has already been created');
    }

    // Create a new user
    const user = await User.create({
      firstName,
      lastName,
      email,
      role,
      password,
    });

    const token = generateToken(user._id);

    if (user) {
      const { _id, email, firstName, lastName, role, password } = user;
      reply.code(201).send({
        _id,
        email,
        firstName,
        lastName,
        token,
        role,
        password,
      });
    } else {
      reply.code(400);
      throw new Error('Invalid user data');
    }
  } catch (err) {
    reply.code(500).send(err.message);
  }
}


async function updateUser(req, reply) {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    reply.send(user);
  } catch (err) {
    reply.status(500).send(err);

  }
}

async function deleteUser(req, reply) {
  try {
    await User.findByIdAndDelete(req.params.id);
    reply.status(204).send(' ');
  } catch (err) {
    reply.status(500).send(err);

  }
}

module.exports = {
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
  getUserById

};
