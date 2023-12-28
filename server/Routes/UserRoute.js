const router = require("express").Router();
const { createUser, deleteUser, updateUser, getUser, getUsers} = require("../Controllers/UserController");

// create user
router.post("/", createUser);

// delete user
router.delete("/:id", deleteUser);

// update user
router.put("/:id", updateUser);

// get user
router.get("/:id", getUser);

// get all users
router.get("/", getUsers);

module.exports = router;