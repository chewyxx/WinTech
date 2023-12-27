const { UserModel } = require("../Models/UserModel");

// delete user
module.exports.deleteUser = async (req, res) => {
    const id = req.params.id;

    try {
        const deletedUser = await UserModel.findByIdAndDelete(id);

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
        const updatedUser = await UserModel.findByIdAndUpdate(id, {
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
        const user = await UserModel.findById(id);

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
module.exports.getUsers = async (req, res) => {
    try {
        const users = await UserModel.find({});

        res.status(200).json({
            success: true,
            message: "All users are found",
            data: users,
            count: users.length,
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: "All users are not found",
        });
    }
};