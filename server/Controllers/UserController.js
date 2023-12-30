const User = require("../Models/UserModel");

// create user
module.exports.createUser = async (req, res) => {
    const { email, password, username, createdAt } = req.body;

    try {
        const user = await User.create({ email, password, username, createdAt });

        res.status(200).json({
            success: true,
            message: "User is created",
            data: user,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "User is not created",
        });
    }
};

// delete user
module.exports.deleteUser = async (req, res) => {
    const id = req.params.id;

    try {
        const deletedUser = await User.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "User is deleted",
            data: deletedUser,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "User is not deleted",
        });
    }
};

// update user
module.exports.updateUser = async (req, res) => {
    const id = req.params.id;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, {
            $set: req.body,
        }, { new: true });

        res.status(200).json({
            success: true,
            message: "User is updated",
            data: updatedUser,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "User is not updated",
        });
    }
};

// get single user
module.exports.getUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id);

        res.status(200).json({
            success: true,
            message: "User is found",
            data: user,
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: "User is not found",
        });
    }
};

// get all users
module.exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find();

        res.status(200).json({
            success: true,
            message: "All users are found",
            data: users,
            count: users.length,
        });
    } catch (err) {
        next(err);
    }
};