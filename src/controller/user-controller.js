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
        const {firstName, lastName, email} = req.body;
        if (!firstName || !email || !lastName) {
            reply.status(400);
            throw new Error("Please fill in all required fields");
        }
        const userExist = await User.findOne({email});
        if (userExist) {
            reply.status(400);
            throw new Error("Email has already been created");
        }
        //?create new user
        const user = await User.create({
            firstName, lastName, email
        })
        const result = user.save();
        reply.send(result)
    } catch (err) {
        reply.status(500).send(err)

    }
}

async function updateUser(req, reply) {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        reply.send(user)
    } catch (err) {
        reply.status(500).send(err)

    }
}

async function deleteUser(req, reply) {
    try {
        await User.findByIdAndDelete(req.params.id)
        reply.status(204).send(" ")
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