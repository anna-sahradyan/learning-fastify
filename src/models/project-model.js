const mongoose = require("mongoose");
const User = require("./user-model");

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true,
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    projectManager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        validate: {
            validator: async function (v) {
                const user = await User.findById(v);
                console.log("User:", user);
                const isValidRole = ["Admin", "Project Manager"].includes(user.role);
                if (!isValidRole) {
                    console.log("Invalid role for the project manager");
                }
                return isValidRole;
            },
            message: (props) => `User must be either "Admin" or "Project Manager"`
        },
    },
    teamMembers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
});

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;
