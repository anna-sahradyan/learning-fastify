const User = require("../models/user-model");

async function getAllUsers(req, reply) {
    try {
        reply.send("not implanted yet")
    } catch (err) {
        reply.status(500).send(err)

    }


}

async function getUserById(req, reply) {
    try {
        reply.send("not implanted yet")
    } catch (err) {
        reply.status(500).send(err)

    }

}

async function createUser(req, reply) {
    try {
        reply.send("not implanted yet")
    } catch (err) {
        reply.status(500).send(err)

    }
}

async function updateUser(req, reply) {
    try {
        reply.send("not implanted yet")
    } catch (err) {
        reply.status(500).send(err)

    }
}

async function deleteUser(req, reply) {
    try {
        reply.send("not implanted yet")
    } catch (err) {
        reply.status(500).send(err)

    }
}

module.exports = {
    getAllUsers,
    createUser,
    deleteUser,
    updateUser,
    getUserById

}