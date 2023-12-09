const User = require("../models/user-model");

async function getAllUsers(req, reply) {
    try {
        const users = await User.find();
        reply.send(users);
    } catch (err) {
        reply.status(500).send(err)

    }


}

async function getUserById(req, reply) {
    try {
        const user = await User.findById(req.params.id)
        reply.send(user)
    } catch (err) {
        reply.status(500).send(err)

    }

}

async function createUser(req, reply) {
    try {
        const user = new User(req.body);
        const result = user.save();
        reply.send(result)
    } catch (err) {
        reply.status(500).send(err)

    }
}

async function updateUser(req, reply) {
    try {
        const user=
        reply.send()
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