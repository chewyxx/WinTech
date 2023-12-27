const router = require("express").Router();
const { deleteUser, updateUser, getUser, getUsers} = require("../Controllers/UserController");

// delete user
router.delete("/:id", deleteUser);

// update user
router.put("/:id", updateUser);

// get user
router.get("/:id", getUser);

// get all users
router.get("/", getUsers);

module.exports = router;